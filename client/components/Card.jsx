import { Box, Center, Image, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaDiscord, FaTree, FaWhatsapp } from "react-icons/fa";
import Tilt from "react-vanilla-tilt";

const Icon = ({ link, titleColor }) => (
  <>
    {link.includes("discord") && (
      <FaDiscord color={titleColor} style={{ marginRight: "5px" }} />
    )}
    {link.includes("chat.whatsapp.com") && (
      <FaWhatsapp color={titleColor} style={{ marginRight: "5px" }} />
    )}
    {link.includes("linktr.ee") && (
      <FaTree color={titleColor} style={{ marginRight: "5px" }} />
    )}
  </>
);

export const Card = ({ name, description, image, links, id }) => {
  const { locale, defaultLocale, push } = useRouter();
  const backgroundColor = useColorModeValue("#FFFFFF", "#181a1b");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const titleColor = useColorModeValue("black", "white");

  const cardStyle = {
    background: backgroundColor,
    width: "300px",
    padding: "30px",
    margin: "10px",
    borderRadius: "4px; color: rgb(54, 73, 98)",
    fontSize: "16px; line-height: 1.6",
    cursor: "pointer",
  };

  return (
    <Tilt
      onClick={() => {
        push(`${locale !== defaultLocale ? locale : ""}/chat/${id}`);
      }}
      style={cardStyle}
    >
      <Box
        bg={backgroundColor}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Center>
          <Image
            fallbackSrc="/logo.png"
            src={
              image ||
              "https://images.unsplash.com/photo-1415201179613-bd037ff5eb29"
            }
            height="200"
            alt="CourseImage"
          />
        </Center>

        <Box p="6">
          <Box
            fontWeight="semibold"
            as="h2"
            lineHeight="tight"
            color={titleColor}
          >
            {name}
          </Box>

          <Box
            mt="1"
            color={descriptionColor}
            fontWeight="semibold"
            as="h2"
            isTruncated
          >
            {description}
          </Box>
          <Box className="d-flex" mt="2">
            {links.map((link, index) => (
              <Icon key={index} color={titleColor} link={link} />
            ))}
          </Box>
        </Box>
      </Box>
    </Tilt>
  );
};

export default Card;
