// 通过axios-mock-adapter生成代理api地址
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// import { LoginUsers } from './data/user'
import {users} from './data/user'
// import {produceNewsData} from './data/produceNewsData'
// // 获取 mock.Random 对象
// const Random = Mock.Random;
// // mock一组数据
// const produceNewsData = function() {
//   let articles = [];
//   for (let i = 0; i < 100; i++) {
//     let newArticleObject = {
//       title: Random.csentence(5, 30), //  Random.csentence( min, max )
//       thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
//       author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
//       date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
//     }
//     articles.push(newArticleObject)
//   }

//   return {
//     articles: articles
//   }
// }

// // Mock.mock( url, post/get , 返回的数据)；
// Mock.mock('/news/index', 'post', produceNewsData);
export default {
  init() {
    let mock = new MockAdapter(axios);

    // mock success request  模拟成功请求
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });
    // mock error request  模拟失败请求
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // login 模拟登录接口
    mock.onPost('/user/login').reply(config => {
      // 解析axios传过来的数据
      let { username, password } = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        // 先创建一个用户为空对象
        let user = null;
        setTimeout(() => {
          // 判断模拟的假数据中是否有和传过来的数据匹配的
          let hasUser = users.some(person => {
            // 如果存在这样的数据
            if (person.username === username && person.password === password) {
              user = JSON.parse(JSON.stringify(person));
              user.password = undefined;
              return true;
            }else {
              //  如果没有这个person
              return false
            }
          });
          // 如果有那么一个人
          if (hasUser) {
            resolve([ 200, {code: 200, msg: '登录成功',user} ]);
          } else {  // 如果没有这么一个人
            resolve([ 200, {code: 500, msg: '账号错误' }])
          }
        }, 500);
      })
    });
  //  模拟注册接口






  
  }
}



