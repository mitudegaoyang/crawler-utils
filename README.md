# crawler-utils 爬取电影数据工具

## 常见操作流程

### 获取电影数据

获取列表数据

```sh
node getList.js
```

获取电影详情数据

```sh
node index.js
```

格式化图片数据

```sh
node formatImages.js
```

### 处理异常电影数据

将待处理的数据复制到 format.json

获取异常列表数据

```sh
node checkList.js
```

获取异常列表电影详情数据

```sh
node index.js
```

合并数据

```sh
node formatTimeIntroduction.js
```

将 formatFinsh.json 内容复制到 format.json，并重复上述操作

### 处理存在下载地址的电影数据

将待处理的数据复制到 format.json

处理数据

```sh
node formatSummary.js
```
