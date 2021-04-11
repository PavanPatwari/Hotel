import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Select, Button, Result, message, Modal } from 'antd';


function FormLayout() {

  const { Option } = Select;

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 7,
      span: 16,
    },
  };
 
  const [dist, setDist] = useState([]);
  const [brand, setBrand] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [brand1, setBrand1] = useState("");
  const [hotelDetails, setHotelDetails] = useState([]);

  useEffect(() => {
    async function getDistance() {
      const response = await fetch("https://distance.free.beeceptor.com/");
      const body = await response.json();
      setDist(body.data);
    }
    getDistance()
  }, []);

  useEffect(() => {
    async function getBrand() {
      const response = await fetch("https://brands.free.beeceptor.com/");
      const body = await response.json();
      setBrand(body.data);
    }
    getBrand()
  }, []); 

  const submitHandler = (e) => {

    e.preventDefault();
    setHotelDetails([...hotelDetails,{
        hotelName : hotelName, 
        location : location,
        distance : distance,
        brand1 : brand
      }])
    localStorage.setItem('Hotel Details', JSON.stringify(hotelDetails));
    const success = () => {
      message.success('Details are added to local storage successfully!!');
    };
    success();
    
  }

    return (
        <div>

    <Form 
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }} 
    >

      <Form.Item
              name="hotel"
              label="Hotel"
              rules={[
                {
                  required: false,
                },
              ]}
      >
      <Input 
        value={hotelName} 
         onChange={e => {setHotelName(e.target.value)}} 
         />
      </Form.Item>

      <Form.Item
              name="location"
              label="Location"
              rules={[
                {
                  required: false,
                },
              ]}
      >
      <Input value={location} 
         onChange={e => {setLocation(e.target.value)}}/>
      </Form.Item>

      
      <Form.Item
        name="distance"
        label="Distance"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select
          placeholder="Select distance"
          value={distance} 
         onChange={e => {setDistance(e.target.value)}}
        >
         {
          dist.map(distance => (
            <Option key={distance} value={distance}>
            {distance}
           </Option>
          ))
        }
        </Select>
      </Form.Item>

      <Form.Item
        name="brand"
        label="Brand"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Select
          placeholder="Select Brand"
          value={brand1} 
         onChange={e => {setBrand1(e.target.value)}}
        >
          {
          brand.map(brand => (
            <Option key={brand} value={brand}>
            {brand}
           </Option>
          ))
        }
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Form.Item>

      </Form>
      
      </div>
    )
}

export default FormLayout;
