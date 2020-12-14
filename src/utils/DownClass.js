/* eslint-disable */
/**
 * DownClass.js
 * 前端打包图片文件
 * @a:wangdongman
 */
const FileSaver = require('file-saver')
const JSZip = require('jszip')
export class DownClass {
  constructor (queue, maxThread) {
    /*
     * 加载队列
     * */
    this.queue = Array.isArray(queue) ? queue : []
    /*
     * 已经加载完队列
     * */
    this.loaded = []
    /*
     * 失败队列
     * */
    this.fail = []
    /*
     * 最大线程 ( 功能暂时未实现 )
     * */
    this.maxThread = maxThread || 3
    /*
     * 画布对象
     * */
    this.canvas = null
    this.ctx = null
    /*
     * 单个文件下载锁定状态
     * */
    this.lock = false
    /*
     * 压缩包锁定状态
     * */
    this.toZipLock = false
    /*
     * 压缩包对象
     * */
    this.zip = new JSZip()
  }
  /**
   *获取图片数据
   * @param img
   * @returns {{base64: string, Blob: *}}
   */
  getImageData (img) {
    let that = this
    if (this.canvas === null) {
      this.canvas = document.createElement("canvas")
    }
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    if (this.ctx === null) {
      this.ctx = this.canvas.getContext("2d")
    }
    this.ctx.drawImage(img, 0, 0, img.width, img.height)
    return {
      base64: that.canvas.toDataURL("image/png"),
      Blob: that.dataURItoBlob(that.canvas.toDataURL("image/png"))
    }
  }
  /**
   * 创建画布对象
   * @param { images } img - 图片对象
   */
  createCanvas (img) {
    if (this.canvas === null) {
      this.canvas = document.createElement("canvas")
    }
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    if (this.ctx === null) {
      this.ctx = this.canvas.getContext("2d")
    }
    this.ctx.drawImage(img, 0, 0, img.width, img.height)
  }
  /**
   * 加载图片资源并转成blob
   * @param {object} object
   * @returns {Promise}
   */
  getImage (object) {
    let that = this
    return new Promise((resolve, reject) => {
      let img = new Image()

      img.crossOrigin = 'Anonymous'
      img.onload = function () {

        that.createCanvas(img)
        that.canvas.toBlob(function (blob) {
          if (object.blob === null) {
            object.blob = blob
            that.loaded.push(object)
          }
          img.onload = null
          img = null
          resolve(object)
        }, "image/png")
      }
      img.onerror = function (err) {
        img.onerror = null
        img = null
        object.blob = null
        reject(object)
      }
      img.src = object.url
      if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = object.url
      }
    })
  }
  /**
   * 加载队列资源
   * @returns {Promise.<void>}
   */
  async loadImages () {
    if (this.lock) {
      console.warn('locking')
      return
    }
    this.lock = true
    for (let i = 0, len = this.queue.length; i < len; i++) {
      if (this.queue[i].blob !== null) {
        continue
      }
      try {
        let result = await this.getImage(this.queue[i])
        console.log('加载文件:loadImages:', result)
      } catch (err) {
        console.error(err)
      }
    }
    this.lock = false
  }
  /**
   * 静态方法: 保存文件
   * @param {String} name - 文件名
   * @param {Blob} blob - 数据
   */
  static downImagesFile (name, blob) {
    FileSaver.saveAs(blob, `${name}.png`)
  }
  /**
   * 单独下载一个文件
   * @param {Object} object - 下载对象
   * @returns {Promise.<void>}
   */
  async downFile (object) {
    if (Object.prototype.toString.call(object) !== '[object Object]') {
      console.warn('请传入一个对象!')
      return
    }
    if (object.lock) {
      console.log('正在下载')
      return
    }
    object.lock = true
    await this.getImage(object)
    object.lock = false
    console.log('object:', object)
    DownClass.downImagesFile(object.fullName, object.blob)
  }
  /**
   * 打包资源
   * @param {String} [fileName] - 打包文件名
   * @returns {Promise.<void>}
   */
  async toZip (fileName) {
    console.log('this.toZipLock:', this.toZipLock)
    if (this.toZipLock) {
      console.warn('正在带包zip')
      return
    }
    this.toZipLock = true
    let time = new Date().getTime()
    let zipName = fileName + time + '.zip'
    console.log('1.加载文件')
    await this.loadImages()
    console.log('2.打包', this.loaded)
    let folder = this.zip.folder(fileName + time)
    this.loaded.forEach((file) => {
      console.log('file:', file);
      // this.zip.file(`${file.fullName}.png`, file.blob)
      folder.file(`${file.fullName}.png`, file.blob);
    })
    this.zip.generateAsync({type: "blob"}).then((content) => {
      FileSaver.saveAs(content, zipName)
      this.toZipLock = false
      folder = null
    })
  }
  clearImages () {
    this.queue = []
    this.loaded = []
    this.fail = []
    this.zip = new JSZip()
  }
  /**
   * 销毁
   */
  destroy () {
    this.queue = []
    this.loaded = []
    this.fail = []
    this.canvas = null
    this.ctx = null
    this.zip = null
  }
}