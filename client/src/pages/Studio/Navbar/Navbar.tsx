import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Menu, MenuButton, MenuList, Spacer, HStack, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGO_FONT } from '~/consts/components';
import { useAppSelector } from '~/hooks/use-app-selector';
import { logout } from '~/store/slices/auth-slice';
import CanvasCreate from '../canvas-actions/CanvasCreate';
import { useEffect } from 'react';
import CanvasesView from '../canvas-actions/CanvasesView';

function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, stage } = useAppSelector((state) => ({ ...state.auth, ...state.frame }));
  const { id, name } = stage;

  useEffect(() => {
    if (!isLoggedIn && !id) {
      return;
    }
  }, [isLoggedIn, id]);

  return (
    <Flex bgGradient="linear(to-r, pink.500, purple.500)" py="2" align="center" id="navbar">
      <Box>
        <Heading
          fontSize="28px"
          fontWeight="400"
          userSelect="none"
          color="white"
          ml="20px"
          mb="0"
          fontFamily={LOGO_FONT}
        >
          Webster
        </Heading>
      </Box>
      <Spacer />
      <HStack sx={{ pr: 4 }} spacing={4}>
        {isLoggedIn ? (
          <>
            <Box>
              <Text display="inline" fontSize="15px" fontWeight="500" color="white" pr="2">
                Current Stage:
              </Text>
              <Text display="inline" fontSize="16px" fontWeight="600" color="white">
                {name}
              </Text>
            </Box>
            <Box>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Canvas Actions
                </MenuButton>
                <MenuList>
                  <VStack spacing={4} sx={{ px: 4 }}>
                    <CanvasCreate />
                    <CanvasesView />
                  </VStack>
                </MenuList>
              </Menu>
            </Box>
            <Button colorScheme="gray" mr="4" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </>
        ) : (
          <Button colorScheme="gray" mr="4" as={Link} to="/auth/sign-in">
            Login
          </Button>
        )}
      </HStack>
    </Flex>
  );
}

export default Navbar;
