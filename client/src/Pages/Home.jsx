import {Box, Button, Menu, MenuButton, MenuItem, MenuList, Textarea, useToast} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";
import {ChevronDownIcon} from "@chakra-ui/icons";


const Home = () => {


    const [text, setText] = useState("");
    const [ans, setAns] = useState("");
    const [lang, setLang] = useState("JavaScript");
    const toast = useToast();


    const copyToClipboard = () => {
        navigator.clipboard.writeText(ans);
        toast({
            title: "Copied to clipboard",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
        });
    };
    const getResult = async () => {
        if (text === "") {
            toast({
                title: "Please enter code to convert!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
        try {
            toast({
                title: "Generating code",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const data = await axios.post(`${import.meta.env.VITE_API_URL}`, {
                text: text,
                lang: lang
            }, config);


            setAns(data.data);
            toast({
                title: "Code Conereted",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

            // console.log(data.data);
        } catch (e) {
            toast({
                title: "Error Occured",
                description: e.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
        }
    }

    return (
        <>
            <Box fontFamily="Josefin Sans" className="flex flex-col h-screen">
                <Box as="h1" textAlign="center" fontFamily="Josefin Sans" className="text-6xl px-4 py-2 pt-3 text-[#f2d0a9] font-bold font-['Josefin Sans']" mb={6}>
                    Code Bilingual
                </Box>
                <Box className="flex w-full justify-between">
                    <Menu>
                        <MenuButton style={{
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingTop: 8,
                            paddingBottom: 8,
                            backgroundColor: 'Yellow',
                            marginLeft:12,
                            borderRadius: 6
                        }}>
                            Select Language
                        </MenuButton>
                        <MenuList>
                            <MenuItem fontFamily="Josefin Sans"
                                      onClick={() => setLang("C++")}>C++</MenuItem>
                            <MenuItem fontFamily="Josefin Sans"
                                      onClick={() => setLang("Java")}>Java</MenuItem>
                            <MenuItem fontFamily="Josefin Sans"
                                      onClick={() => setLang("Python")}>Python</MenuItem>
                            <MenuItem fontFamily="Josefin Sans"
                                      onClick={() => setLang("Javascrip")}>Javascript</MenuItem>
                            <MenuItem fontFamily="Josefin Sans"
                                      onClick={() => setLang("Ruby")}>Ruby</MenuItem>
                            <MenuItem fontFamily="Josefin Sans"
                                      onClick={() => setLang("Rust")}>Rust</MenuItem>
                            <MenuItem fontFamily="Josefin Sans"
                                      onClick={() => setLang("Go")}>Go</MenuItem>
                        </MenuList>
                    </Menu>
                    <button onClick={getResult} className="ml-2 px-4 py-2 bg-green-600 rounded-lg">Generate</button>
                    <button onClick={copyToClipboard} className="mr-2 px-4 py-2 bg-gray-300 rounded-lg">Copy to Clipboard</button>
                </Box>
                <Box className="flex-grow flex">
                    <Box className="w-12 flex flex-col justify-start items-center ml-2 my-2 rounded-l-md text-gray-800 bg-gray-600 px-2 py-8">
                        {text.split('\n').map((_, index) => (
                            <span key={index} className="text-right mb-1">{index + 1}</span>
                        ))}
                    </Box>
                    <textarea
                        className="flex-grow bg-gray-600 text-gray-100 rounded-r-md mr-1 my-2 outline-none px-4 py-8 border-r overflow-auto"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Box className="w-12 flex flex-col justify-start items-center ml-1 my-2 rounded-l-md border-l text-gray-800 bg-gray-600 px-2 py-8">
                        {ans.split('\n').map((_, index) => (
                            <span key={index} className="text-right mb-1">{index + 1}</span>
                        ))}
                    </Box>
                    <textarea
                        className="flex-grow bg-gray-600 text-gray-100  rounded-r-md my-2 mr-2 outline-none px-4 py-8 "
                        value={ans}
                    />
                </Box>
                </Box>
        </>
    )
}

export default Home;