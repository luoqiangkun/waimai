import Mock from 'mockjs'

const user = Mock.mock('/user', /post|get/i, {
    'list|15': [
        {
            'id|+1': 1,
            'name': '测试',
            'status|1': true,
            'totalPrice|100-1000': 0
        }
    ]

})
const tableInfo = Mock.mock('/tableInfo', /post|get/i, {
    'list|3-5': [
        {
            'unitPrice|10-100': 0,
            'dishName': '@cword(20)',
            'mealId|+1':6,
            'count':1
        }
    ]
})
const mealNav = Mock.mock('/mealNav', /post|get/i, {
    'list|9': [
        {
           'name':'@cword(2)',
           'id|+1':0
        }
    ]
})

const mealName = Mock.mock('/mealName', /post|get/i, {
    'list|9': [
        {
            'unitPrice|10-100': 0,
           'name':'@ctitle(5,10)',
           'id|+1':0
        }
    ]
})
export default { user, tableInfo,mealNav,mealName }

