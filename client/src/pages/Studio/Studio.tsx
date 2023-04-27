import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Center } from '@chakra-ui/react';
import React from 'react';
import Konva from 'konva';
import Frame from './Frame';
import Resize from './tools/Resize';
import Export from './tools/Export';
import Navbar from '../Navbar/Navbar';

const Studio = () => {
  const stageRef = React.useRef<Konva.Stage>(null);

  return (
    <div>
      <Navbar />
      <Flex h="100vh" w="100%">
        <Tabs orientation="vertical" variant="solid-rounded" colorScheme="gray" h="100%" id="toolbar">
          <TabList>
            <Tab>Resize</Tab>
            <Tab>Export</Tab>
          </TabList>

          <TabPanels maxW="350px" minW="250px" bgColor="gray" overflowY="scroll">
            <TabPanel>
              <Resize />
            </TabPanel>
            <TabPanel>
              <Export stageRef={stageRef} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Center flexGrow="1" minH="100vh" bgColor="gray.100" padding="20px">
          <Frame stageRef={stageRef} />
        </Center>
      </Flex>
    </div>
  );
};

export default Studio;
