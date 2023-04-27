import { Flex, Center } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import Frame from './Frame';
import Navbar from '../Navbar/Navbar';
import Toolbar from './Toolbar';

const Studio = () => {
  const stageRef = React.useRef<Konva.Stage>(null);

  const [navbarHeight, setNavbarHeight] = useState(56);

  useEffect(() => {
    const navbar = document.querySelector('#navbar') as HTMLElement;
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Flex h={`calc(100vh - ${navbarHeight}px)`} w="100%">
        <Toolbar stageRef={stageRef} />

        <Center flexGrow="1" h={`calc(100vh - ${navbarHeight}px)`} bgColor="gray.100" padding="20px">
          <Frame stageRef={stageRef} />
        </Center>
      </Flex>
    </div>
  );
};

export default Studio;
