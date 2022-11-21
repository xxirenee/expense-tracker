# Expense tracker 記帳本
![This is an image](https://github.com/xxirenee/expense-tracker/blob/main/public/Cover.PNG)

## 功能
- 使用者可使用email或facebook創建帳號並建立屬於自己的資料
- 首頁可列出所有支出的清單和總金額
- 可以根據類別作篩選和分別呈現花費金額
- 可新增一筆支出
- 可刪除一筆支出
- 可編輯一筆支出

## 開始使用
1.請先安裝 node.js 與 npm

2.將專案 clone 到本地
```
https://github.com/xxirenee/expense-tracker.git
```

3.在本地開啟之後，透過終端機進入資料夾
```
cd expense-tracker
```

4.安裝nodemon

```
npm install -g nodemon
```

5.安裝完畢後，輸入：

```
npm run seed
npm run start
```

6.若能看見以下訊息代表運行成功，可用瀏覽器進入到以下網址:

```
Express is listening on localhost:3000
```

7.結束運行請輸入:

```
ctrl + c
```
##測試帳戶
- Mail: ```user1@example.com, user2@example.com```
- Password: 12345678

## 開發工具
- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dayjs: 1.11.6
- Express 4.16.4
- Express-Handlebars 6.0.6
- express-session: 1.17.1
- MongoDB
- mongoose 6.0.0
- passport: 0.4.1
- passport-facebook: 3.0.0
- passport-local: 1.0.0
