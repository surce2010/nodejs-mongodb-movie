// todo support ES6
var express = require('express')
var path = require('path')
var _ = require('lodash')
var port = process.env.PORT || 4000
var app = express()

//https://www.npmjs.com/package/body-parser
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
var Movie = require('./models/movie')

// locals moment.js
app.locals.moment = require('moment')

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on prot' + port)

// 路由配置
app.get('/', function (req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err, '错误信息')
		}
		res.render('index', {
			title: '电影首页',
			movies: movies
		})
	})
})

app.get('/movie/:id', function (req, res) {
	var id = req.params.id

	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc ' + movie.title,
			movie: movie
		})
	})
})

// 表单录入
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

// 表单更新
app.get('/admin/update/:id', function(req, res) {
	var id = req.params.id
	if (id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页',
				movie: movie
			})
		})
	}
})

// 录入表单提交页面
app.post('/admin/movie/new', urlencodedParser, function (req, res) {
	var id = req.body._id
	var movieObj = req.body
	var _movie
	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err, '错误信息')
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err, '错误信息')
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	} else {
		_movie = new Movie({
			title: movieObj.title,
			doctor: movieObj.doctor,
			performer: movieObj.performer,
			country: movieObj.country,
			language: movieObj.language,
			poster: movieObj.poster,
			flash: movieObj.flash,
			year: movieObj.year,
			summary: movieObj.summary
		})
		_movie.save(function(err, movie) {
			if (err) {
				console.log(err, '错误信息')
			}

			res.redirect('/movie/' + movie._id)
		})
	}
})

app.get('/admin/list', function (req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err, '错误信息')
		}
		res.render('list', {
			title: '后台管理列表页',
			movies: movies
		})
	})
})