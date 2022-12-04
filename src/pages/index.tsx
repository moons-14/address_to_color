import { ActionIcon, Box, Center, Container, Space, Text, TextInput, Title, useMantineTheme } from '@mantine/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IconPaint } from '@tabler/icons';
import ColorHash from 'color-hash';
import Head from 'next/head';
import { memo, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Home() {
  const [color, setColor] = useState<string>("#fff");
  var colorHash = new ColorHash();
  const { address, isConnecting, isDisconnected } = useAccount()
  const addressInputClick = (address: string) => {
    setColor(colorHash.hex(address))
  }
  return (
    <div >
      <Head>
        <title>Address to Color</title>
        <meta name="description" content="Generates a specific color from an address" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:site" content="@moons_dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Address to Color" />
        <meta property="og:description" content="Generates a specific color from an address" />
        <meta property="og:url" content="https://color.moons14.com/" />
        <meta property="og:site_name" content="Address to Color" />
        <meta property="og:image" content="https://color.moons14.com/ogp.jpg" />
      </Head>
      <div style={{ background: address && !isDisconnected ? colorHash.hex(address) : color }}>
        <Container>
          <Center style={{ height: "100vh" }}>
            <Box>
              {(address && !isDisconnected || color != "#fff") ?
                <Box my={30} p="md">
                  <Center><Title order={3}>Your Color</Title></Center>
                  <Center my={10}>{address && !isDisconnected ? colorHash.hex(address) : color}</Center>
                </Box>
                :
                <>
                  <Center><Title>Address to <Text span c="blue" inherit>Color</Text></Title></Center>
                  <Center><Text fz="xl" my={10} style={{ textAlign: "center" }}>Generates a specific color from an address</Text></Center>
                  <Space h={30} />
                  <AddressInput onClick={addressInputClick} />
                  <Center fz={20} my={20}><Text>OR</Text></Center>
                  <Center><ConnectButton chainStatus="none" showBalance={false} /></Center>
                </>
              }
            </Box>
          </Center>
        </Container>
      </div>
    </div>
  )
}

const AddressInput: React.FC<{ onClick: (address: string) => void }> = memo(({ onClick }) => {
  const [inputAddress, setInputAddress] = useState("");
  const theme = useMantineTheme();
  return (<TextInput
    radius="xl"
    size="md"
    rightSection={
      <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={() => { onClick(inputAddress) }}>
        {<IconPaint size={18} stroke={1.5} />}
      </ActionIcon>
    }
    placeholder="Wallet Address"
    rightSectionWidth={42}
    value={inputAddress}
    onChange={(e) => { setInputAddress(e.target.value) }}
  />)
})
