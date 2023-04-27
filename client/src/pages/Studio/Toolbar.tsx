import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Resize from './tools/Resize';
import Export from './tools/Export';
import Images from './tools/Images';
import Konva from 'konva';
import { TABS } from '~/consts/components';

type Props = {
  stageRef: React.RefObject<Konva.Stage>;
};

const Toolbar = ({ stageRef }: Props) => {
  return (
    <Tabs orientation="vertical" variant="line" colorScheme="blue" h="100%" id="toolbar">
      <TabList>
        {TABS.map((t, i) => (
          <Tab px="6" py="4" key={i}>
            {/* <Icon as={t.icon} mr="2" /> */}
            {t.title}
          </Tab>
        ))}
      </TabList>

      <TabPanels maxW="350px" minW="250px" bgColor="gray" overflowY="auto">
        <TabPanel>
          <Resize />
        </TabPanel>
        <TabPanel>
          <Export stageRef={stageRef} />
        </TabPanel>
        <TabPanel>
          <Images />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Toolbar;
