const supabaseClient = require('@supabase/supabase-js')
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
app.use(express.static(__dirname + '/public'))



const supabaseURL = 'https://prwypsbxgfzqwqltvszm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByd3lwc2J4Z2Z6cXdxbHR2c3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3MjM1ODQsImV4cCI6MjAzMTI5OTU4NH0.zO5Egnl8RKYhn-YzEd3m5qsZh_Udgk2VuDdZQUSTfkY'
const supabase = supabaseClient.createClient(supabaseURL,supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('public/login.html', {root:__dirname})
})

app.post('/addBook', async (req,res) => {
    var id = req.body.user_id
    var title = req.body.title
    var author = req.body.author
    var cover =req.body.cover
    const {error} = await supabase
        .from('books')
        .insert({"title": title, 'author': author, "user_id" : id, "cover": cover})
        if(error) {
            console.log(error)
            res.send(error)
        }
}
)

app.get('/userBooks', async (req,res) => {
    var id = req.query.user_id
    console.log(req)
    const {data,error} = await supabase
        .from('books')
        .select()
        .eq('user_id',id)
        if (error){
            res.send({error})
        }
        else{
            res.send(data)
        }
}
)

app.post('/signup', async (req,res) => {
    var username = req.body.username
    var password = req.body.password
    const {error} = await supabase
        .from('users')
        .insert({'username': username, 'password': password})
        if(error) {

            console.log(error)
            res.send(error) 
        }
    
})

app.get('/login', async (req,res) => {
    user = req.query.user
    const {data, error} = await supabase
        .from('users')
        .select()
        .eq('username',user)
        if(error){
            res.send({error})
        }
        else{
            res.send(data)
        }
})

app.listen(port, () => {

})