const url = '/api/v1/posts';
const fileFormDOM = document.querySelector('.file-form')

const nameInputDOM = document.querySelector('#name')
const priceInputDOM = document.querySelector('#price')
const imageInputDOM = document.querySelector('#image')

const containerDOM = document.querySelector('.container')
let imageValue;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })







imageInputDOM.addEventListener('change',async (e)=>{
 const imageFile = e.target.files[0];
 const formData = new FormData();
 formData.append('image',imageFile)
 try {
  const {data:{image:{src}}} = await axios.post(`${url}/uploads`,formData,{
   headers:{
    'Content-Type':'multipart/form-data'
   }
  })
  imageValue = src
 } catch (error) {
   imageValue = null
  console.log(error);
 }
})


fileFormDOM.addEventListener('submit',async (e)=>{
e.preventDefault()
const nameValue = nameInputDOM.value;
const priceValue = priceInputDOM.value;
try {
 
 const post = {title:nameValue,description:priceValue,image:imageValue}
 
  await axios.post(url,post);
  fetchPosts()
} catch (error) {
 console.log(error);
}
})



async function fetchPosts () {
 try {
  const {data:{posts}} = await axios.get(url`/home`);
  
  const postsDOM = posts.map((post)=>{
return `<article class="product">
<img src="${post.image}" alt="${post.title}" class="img"/>
<footer>
<p>${post.title}</p>
<span>$${post.description}</span>
</footer>
</article>`
  }).join('')
  containerDOM.innerHTML = postsDOM
 } catch (error) {
  console.log(error);
 }
 
}

fetchPosts()