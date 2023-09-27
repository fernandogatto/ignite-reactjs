import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Fernando Gatto</Text>
          <Text color="gray.300" fontSize="small">
            fernandogatto17@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Fernando Gatto" src="https://github.com/fernandogatto.png" />
    </Flex>
  );
}