import React from 'react'
import './Navbar.css'
// import { Button } from 'react-bootstrap';
import { Button } from '@chakra-ui/react'
const Navbar = () => {
  return (
    <div>
      <h2>에라이!</h2>
      {/* <Button variant="warning">Warning</Button> */}
      <Button colorScheme='blue'>Button</Button>
    </div>
  )
};
export default Navbar
