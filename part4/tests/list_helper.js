const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0) {
        return 0
    } 
    const likes = blogs.map(blog => blog.likes)
    const sumLikes = likes.reduce((first, second) => {
        return first+second
    })
    return sumLikes 
}

const favoriteBlog = (blogs) => {
    var selected = {}
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    blogs.forEach(blog => {
        if(blog.likes === mostLikes) {
            selected.title = blog.title
            selected.author = blog.author
            selected.likes = blog.likes
        }
    }) 
    return selected
}

const mostBlogs = (blogs) => {
    const selected = {}
    const freqAuthors = _.countBy(blogs.map(blog => blog.author))
    const maxBlogs = Math.max(...Object.values(freqAuthors))
    for(const [key, value] of Object.entries(freqAuthors)) {
        if(value === maxBlogs) {
            selected.author = key
            selected.blogs = value
        }
    }
    return selected
}

const mostLikes = (blogs) => {
    const selected = {}, total = {}
    blogs.forEach(blog => {
        if(!total[blog.author]) {
            total[blog.author] = blog.likes
        }
        else {
            total[blog.author] += blog.likes
        }
    })
    const maxLikes = Math.max(...Object.values(total))
    for(const [key, value] of Object.entries(total)) {
        if(value === maxLikes) {
            selected.author = key
            selected.likes = value
        }
    }
    return selected
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}