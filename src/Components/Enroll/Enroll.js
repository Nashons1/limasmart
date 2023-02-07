import React from 'react';
import { useState } from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import './Enroll.css';
import { Link, useNavigate } from 'react-router-dom';
import { CONTRACT_ADDRESS, abi } from '../constants';
// import { ethers } from 'ethers';
// import { providers, Contract }  from "ethers";


function Enroll() {
    const navigate = useNavigate()
    const [error,setError] = useState('');
    const [product_name,setProduct_name] = useState('');
    const [price,setPrice] = useState('');
    const [product_description,setProduct_description] = useState('');
    const [available_stock,setAvailable_stock] = useState('');
    const [days_left,setDays_left] = useState('');
    const [investors,setInvestors] = useState('');
    const [product_image,setProduct_image] = useState(null);
    const [profile_image,setProfile_image] = useState('');
    const [raised_amount,setRaised_amount] = useState('');
    const [min_invest,setMin_invest] = useState('');
    const [imageurl, setImageurl] = useState('');


// const onHandleSubmit =async(e)=>{
//     e.preventDefault('');
//     setProduct_name('');
//     setPrice('')
//     setProduct_description('')
//     setAvailable_stock('')
//     setDays_left('')
//     setInvestors('')
//     setProduct_image('')
//     setProfile_image('')
//     setRaised_amount('')
//     setMin_invest('')
    // setImageurl('')
 

   //Register Business...
// const response = await fetch('http://localhost:3001/enroll',{
//     method:'POST',
//     headers:{
//       'Content-Type':'application/json'
//     },
//     body:JSON.stringify({
//         product_name,price,product_description,available_stock,product_image
//     }),
//    });
// if(response.status == 201){
//     const {product} = await response.json();
//     await setError(`Congratulations ${product.product_name} , you have successfully added a product`)
//     navigate('/')
// }else if(response.status == 400){
//    const {errors} = await response.json();
   
//         setError(errors)
      
// }

    // }

    //This function uploads the  image to cloudinary
    async function OnChangeFile() {
        var file = product_image;

        try {
            const response = await fetch('http://localhost:3001/upload-image',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({file}),
   });

if(response.status == 201){
    const {imagePath} = await response.json();
    setImageurl(imagePath.secure_url);
    await setError(`Congratulations ${imagePath.url} , you have successfully added a product`)
    navigate('/')
}else if(response.status == 400){
   const {errors} = await response.json();
   
        setError(errors)
      
}
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }


const onProductName =(e)=>{
        setProduct_name(e.target.value);
    }
const onChangeTarget =(e)=>{
        setProduct_description(e.target.value);
    }
const onChangeTagLine =(e)=>{
        setPrice(e.target.value);
    }  
const onChangeValuation =(e)=>{
   setAvailable_stock(e.target.value);
}  
const onCompanyNmae =(e)=>{
    setProduct_name(e.target.value);
}
const onChangeSetDaysLeft =(e)=>{
    setDays_left(e.target.value);
}
const onChangeInvestors =(e)=>{
    setInvestors(e.target.value);
}    
const onChangeBackgroundImage =(e)=>{
    setProduct_image(e.target.value);
}
const onChangeProductImage =(e)=>{
    setProduct_image(e.target.value);
}
const onChangeRaisedAmount =(e)=>{
    setRaised_amount(e.target.value);
}
const onChangeMinInvest =(e)=>{
    setMin_invest(e.target.value);
}



async function listProduct() {
    const ethers = require("ethers");

    
    try {

        await OnChangeFile()
         console.log("uploaded")
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

        //massage the params to be sent to the contract
        // const price = ethers.utils.parseUnits(formParams.price, 'ether')
        

        //actually list the product
        let transaction = await contract.listProduct(product_name, product_description, available_stock, imageurl, price)
        await transaction.wait()

        alert("Successfully listed your Product!");
       
        window.location.replace("/")
    }
    catch(e) {
        alert( "Upload error"+e )
    }
}
  return (
    <div>
            <div className='form-container  flex items-center relative'>
    <div className='form-div '>
    <div><LocationCityIcon style={{fontSize: "xxx-large", color:"#5EBCB6"}}/></div>
<p className='text-3xl '>List your Product</p>
<form onSubmit={listProduct} className='form'>
    <div className='input-div flex place-content-between'>
    <label className='form-label'>Product Name :</label>
    <input className='input' type='text'  required name="product_name" value={product_name} onChange={onProductName} />
    </div>
    <div className='input-div flex place-content-between'>
    <label className='form-label'>Price :</label>
    <input className='input' type='number' required name="price"  value={product_description}  onChange={onChangeTarget} />
    </div>
    <div className='input-div flex place-content-between'>
    <label className='form-label'>Product Description :</label>
    <input className='input' type="text" name='product_description' required  value={price} onChange={onChangeTagLine} />
    </div>
    <div className='input-div flex place-content-between'>
    <label className='form-label'>Available Stock :</label>
    <input className='input' type="number" name='available_stock' required  value={available_stock} onChange={onChangeValuation} />
    </div>
    {/* <div className='input-div flex place-content-between'>
    <label className='form-label'>Days Left :</label>
    <input className='input' type="number" name='days_left' required  value={days_left} onChange={onChangeSetDaysLeft} />
    </div>
    <div className='input-div flex place-content-between'>
    <label className='form-label'>Number Of Investors :</label>
    <input className='input' type="number" name='investors' required  value={investors} onChange={onChangeInvestors} />
    </div> */}
    <div className='input-div flex place-content-between'>
    <label className='form-label'>Product Image :</label>
    <input className='input' type="file" name='product_image' required  value={product_image} onChange={onChangeProductImage} />
    </div>
    {/* <div className='input-div flex place-content-between'>
    <label className='form-label'>Profile Image :</label>
    <input className='input' type="text" name='profile_image' required  value={profile_image} onChange={onChangeProfileImage} />
    </div> */}
    {/* <div className='input-div flex place-content-between'>
    <label className='form-label'>Raised Amount :</label>
    <input className='input' type="number" name='raised_amount' required  value={raised_amount} onChange={onChangeRaisedAmount} />
    </div>
    <div className='input-div flex place-content-between'>
    <label className='form-label'>Minimum Investment Amount :</label>
    <input className='input' type="number" name='min_invest' required  value={min_invest} onChange={onChangeMinInvest} />
    </div> */}

    {/* <div className='flex place-content-center mt-2 text-slate-400'><p>Already have an account  ? <Link to='/login' className='text-blue-300 '>Login</Link></p></div> */}

    <input type='submit' value='Submit' className='submit-button' />
</form>

    </div>
    <div className='absolute bottom-0 w-screen mb-2'>
       <h3>{error}</h3>
    </div>

    </div>
    </div>
  )
}

export default Enroll