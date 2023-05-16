import { Box, Center, Heading, Image, Show, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import SeoTags from "../../components/seoTags";
import TabsCategory from "../../components/TabsCategory";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import client, {
  getAllproductByPage,
  getSeoForPate,
} from "../../lib/apollo-client";
const HeadCat = () => {
  return (
    <Box justifyContent="center" w="full" alignItems="center">
      <Head>
        <title>
          {" "}
          Get a quote for home, hotel and pet products from reputable
        </title>
        <meta
          name="keywords"
          content="Get a quote for home, hotel and pet products from
        reputable manufacturer. products are manufactured with standards,
        market-matching quality, low MOQ competitive prices from lovely sales
        team."
        />
      </Head>
      <Show above="md">
        <Image src="/images/Banner/3.jpg" w="full" />
      </Show>
      <Heading textAlign="center" py="4">
        PET
      </Heading>
      <Text
        textAlign="center"
        px="4"
        fontSize={"14"}
        py="2"
        w="fit-content"
        margin={"auto"}
        maxW="4xl"
      >
        Lovely pets has a lovely collection from OYA’s. Our little friends
        deserve more caring…
      </Text>
      <Text
        textAlign="center"
        px="4"
        py="2"
        fontSize={"14"}
        w="fit-content"
        margin={"auto"}
        maxW="2xl"
      >
        OYA’s products for Pets are manufactured with standards, in addition to
        a competitive price to match your country’s market requirements and
        needs.
      </Text>
      <Text
        textAlign="center"
        px="4"
        py="2"
        fontSize={"14"}
        w="fit-content"
        margin={"auto"}
        maxW="2xl"
      >
        {/* Subscribe to our newsletter<a href="https://www.linkedin.com/newsletters/pet-textile-news-6897475199600615424/" target="_blank">&nbsp;
        <strong> on LINKEDIN </strong>&nbsp;</a> for more information and tips.  */}
        Subscribe to our newsletter{" "}
        <Button
          size="sm"
          bg={"#3ea394"}
          color="white"
          p="4"
          border={"1"}
          _hover={{
            color: "#3ea394",
            bg: "white",
            border: "1px solid",
          }}
        >
          <a
            target="_blank"
            href="https://www.linkedin.com/newsletters/pet-textile-news-6897475199600615424/"
          >
            on LINKEDIN
          </a>{" "}
        </Button>
        or{" "}
        <Button
          size="sm"
          bg={"#3ea394"}
          color="white"
          p="4"
          border={"1"}
          _hover={{
            color: "#3ea394",
            bg: "white",
            border: "1px solid",
          }}
        >
          <a
            target="_blank"
            href="https://oyatextile.com/cms/wp-content/uploads/2023/05/OyaPet-.pdf"
          >
            {" "}
            download our Catalog
          </a>
        </Button>{" "}
        for more information and tips.
      </Text>
    </Box>
  );
};
const Pet: NextPage = ({ body, seo }: any) => {
  const head = ["Dog Towel", "Dog Bed"];
  return (
    <Box justifyContent="center" alignItems="center" bg="white" color="black">
      <Center pb="6">
        <HeadCat />
      </Center>
      <TabsCategory head={head} body={body} />;
    </Box>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  var { data } = await client.query({
    query: getAllproductByPage,
    variables: {
      name: "Dog Towel",
    },
  });
  const body = [data.productCategory.products.nodes];
  var { data } = await client.query({
    query: getAllproductByPage,
    variables: {
      name: "Dog Bed",
    },
  });
  body.push(data.productCategory.products.nodes);
  // var { data } = await client.query({
  //   query: getSeoForPate,
  //   variables: {
  //     name: "/index.php/pet/",
  //   },
  // });
  return {
    props: {
      body: body,
      // seo: data.page.seo,
    },
  };
}
export default Pet;
