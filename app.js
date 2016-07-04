// todo support ES6
var express = require('express')
var path = require('path')
var port = process.env.PORT || 4000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on prot' + port)

// 路由配置
app.get('/', function (req, res) {
  res.render('index', {
  	title: '电影首页',
  	movies: [
  		{
	  		title: '机械战警',
	  		_id: 1,
	  		poster: 'http://t3.baidu.com/it/u=1849898466,2538595181&fm=20'
	  	},{
	  		title: '机械战警',
	  		_id: 2,
	  		poster: 'http://t3.baidu.com/it/u=1849898466,2538595181&fm=20'
	  	},{
	  		title: '机械战警',
	  		_id: 3,
	  		poster: 'http://t3.baidu.com/it/u=1849898466,2538595181&fm=20'
	  	}
  	]
  })
})

app.get('/movie/:id', function (req, res) {
  res.render('detail', {
  	title: '电影详情页',
  	movie: {
  		flash: 'http://player.youku.com/player.php/Type/Folder/Fid/27572371/Ob/1/sid/XNTU2NzEzODky/v.swf',
  		title: '机械战警',
  		performer: '乔尔·金纳曼 / 艾比·考尼什 / 加里·奥德曼',
  		doctor: '何塞·帕迪里亚',
  		country: '美国',
  		language: '英语',
  		year: '2014-02-12',
  		summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 ...'
  	}
  })
})

app.get('/admin/movie', function (req, res) {
  res.render('admin', {
  	title: '后台管理页',
  	movie: {
  		title: '',
  		performer: '',
  		doctor: '',
  		country: '',
  		language: '',
  		year: '',
  		poster: '',
  		flash: '',
  		summary: ''
  	}
  })
})

app.get('/admin/list', function (req, res) {
  res.render('list', {
  	title: '后台管理列表页',
  	movies: [{
  		_id: '1',
  		title: '机械战警',
  		performer: '乔尔·金纳曼 / 艾比·考尼什 / 加里·奥德曼',
  		doctor: '何塞·帕迪里亚',
  		country: '美国',
  		year: '2014-02-12',
  		meta: {
  			createdAt: '2014-02-12'
  		}
  	}]
  })
})