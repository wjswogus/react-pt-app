import { Card, CardActionArea, CardContent, CardMedia, Divider, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import MapInfo from '../../components/MapInfo';
import NavTool from '../../components/NavTool';
import ReviewForm from '../../components/ReviewForm';
import ReviewSlide from '../../components/ReviewSlide';


const ContainerStyle = styled.div`
    -webkit-box-lines: multiple !important;
    -webkit-box-pack: start !important;
    -ms-flex-pack: start !important;
    -webkit-box-align: stretch !important;
    -ms-flex-align: stretch !important;
    display: -webkit-box !important;
    display: -moz-box !important;
    display: -ms-flexbox !important;
    display: -webkit-flex !important;
    display: flex !important;
    -webkit-align-items: stretch !important;
    align-items: stretch !important;
    -webkit-justify-content: flex-start !important;
    justify-content: flex-start !important;
    -webkit-flex-wrap: wrap !important;
    -ms-flex-wrap: wrap !important;
    flex-wrap: wrap !important;
    width: 100% !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
    padding-top: 30px !important;
    padding-bottom: 30px !important;
    margin-left: auto !important;
    margin-right: auto !important;
`;
const ContentStyle = styled.div`
    display: block;
    position: relative !important;
    width: 58.3333% !important;
    margin-left: 0% !important;
    margin-right: 0% !important;
`;

const BoxStyle = styled.div`
    position: relative !important;
    width: 33.3333% !important;
    margin-left: 8.33333% !important;
    margin-right: 0% !important;
    height: 1500px;

`;
const navBar = styled.div`
   
`;

const Shop = (props) => {
    
    const [reviews , setReview] = useState();


    const [shop, setShop]= useState([]);

    const getAdd = () => {
        alert("주소가 복사되었습니다");

    }
    
    const [state,setState] = useState({
        value: '',
        copied: false,
      });
    
    

		/*let jwtTokenTemp = localStorage.getItem("Authorization");
		let jwtToken = jwtTokenTemp.replace('Bearer ', '');

		setUserId(jwt_decode(jwtToken).id); 

		if(!isLogin){
			alert('로그인 후 이용할 수 있습니다.');
			props.history.push("/");  
        }
        fetch("http://localhost:8000/post/"+props.match.params.id, {
			method: "GET",
			headers:{
				"Authorization": localStorage.getItem("Authorization")
			}
		}).then(res=>res.json()).then(res=>{
			setPost(res); 
		});
        */
       function shopFetch(no){
           fetch("http://10.100.102.27:8000/ptDetail/" + no, {
            method: "GET"
            
        }).then(res=>res.json())
        .then(res=>{
            console.log(res);
            console.log(shop.pt_address);

            setShop(res); 
        });
        }
        
        

    useEffect(() => {
        shopFetch(props.match.params.id);
    }, []);

      

    return (
        <div>

            <h1 className="al_middle">{shop.pt_name}</h1>
            <div>
            <br/><br/><br/>
            </div>
            <img src={shop.pt_img} alt="not exist iamge"/>
            <br/><br/>
            <Divider/>
            <ContainerStyle>
            
                <ContentStyle>
                    <br/><br/>
                    <h4>
                        {shop.pt_content}
                    </h4>
                    <br/><br/>
                    <Divider/>
                    <br/><br/>
                    <h4>
                        {shop.pt_address}
                    </h4>       
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> 
            
                    <MapInfo name={shop.pt_name} add={shop.ptAddress}/>
                    <br/>

                    <CopyToClipboard text={shop.ptAddress}
                        onCopy={() => setState({copied: true})}>
                        <button onClick={getAdd}>주소복사</button>
                    </CopyToClipboard>

                </ContentStyle>
                
                <BoxStyle>
                    <div className="nav">
                    <NavTool price={shop.pt_price} ptNo={shop.ptNo}/>
                    </div>
                </BoxStyle>
            </ContainerStyle>
                  
            <Divider/>

            <br/><br/>

            <br/><br/>
            <h2 className="al_middle">REVIEW</h2> 

            <br/>

            <ReviewSlide/>
            
            <br/>

            <ReviewForm ptNo={shop.ptNo}/>
        </div>
    );
};

export default Shop;
