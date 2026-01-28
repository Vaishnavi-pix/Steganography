# Text Based Steganagraphy using Prepositional Encoding with LLMs

## Introduction

Steganagraphy is the art of hiding something in plain sight the main idea is to not bring attention to the message. Cryptography is encoding a message such that it looks meaningless -  any one looking at that encrypted message will know you are hiding something. Why is stegnagraphy important? for authoritarian rejimes that flush out secrets, the only way to keep secrets is with steganagrpahy. Steganagraphy is not new it goes all the way to the ancient times; During the circa 440 BCE Herodotus would carve a message into a wooden tablet then cover the tablet in wax. The wax would make the tablet look blank and to read it the recipient would melt the wax. 

An innocent looking messsage sent by Germans during WW1 about Troop movement:

```text
PRESIDENT'S EMBARGO RULING SHOULD HAVE IMMEDIATE NOTICE. GRAVE 
SITUATION AFFECTING INTERNATIONAL LAW. STATEMENT FORESHADOWS 
RUIN OF MANY NEUTRALS. YELLOW JOURNALS UNIFYING NATIONAL 
EXCITEMENT IMMENSELY.
```

which translated to:

```
PERSHING SAILS FROM N.Y. JUNE 1
```

Take the first letter of each letter of the encoded word to decipher the message.


### Current State

A large amount of computer security research went into cryptography and the Internet benifited from it. Both in terms of privacy and commerce the entire SSL protocol is based on cryptography. On the steganagraphic side the field is either digital encoded messages or text based. Encoding based stypically encodes messages into other formats like: images, audio files, network traffic, videos, or PDFs. The idea is to make minor changes that the viewer doesn't realize anything changed - the image looks the same, music sounds the same, PDF reads the same, etc. These types on steganagraphic messages are thwarted by converting formats for example: GIF to PNG or compression like: PDF to PDF Zip Compressed. 

And we have Text Based Steganagraphy^1 which are typically: format based systems: this is using a pre-defined cover text and stragetically inserting spelling mistakes, punctuation mistakes, chaning words using a common thesarus, or other seeminly innocuous changes. The cover text can be pre-determined or generated. 

### LLMs

The reader is already aware of the recent advancements in Generative AI, in this writing I will describe a method to encode a message using prepositions and Generative AI to generate covertext. Generative AI produce text the are most statisically correct this is perfect for tools that use statistical methods. I will describe other approaches to do the same and show why the method described in this paper is different.

## Algorithm

### High-Level Description

The high-level approach is to use the binary representation of all the text values, map each one of the values to a list of prepositions, and then generate cover text to between the prepositions.

#### Encode 

The proposed approach is based on the following steps:

1. Convert each character including spaces and punctuations into it's ASCII value.
2. For each value converted value map it to a preposition; the following table illustrates a sample mapping.

| hex| preposition  | hex  | preposition   |
|---|---|---|---|
| 0  | in  | 8| between  |
| 1  | on  | 9 | into  |
| 2  | at  | a | through  |
| 3  | by  | b | during  |
| 4  | for  | c  |  before |
| 5  | with  | d  |  after |
| 6  | about  | e  | above  |
| 7  |  against | f  | below  |

3. Generate cover text with LLM prompts; to use the prepositions in order and not use any other preposition in the list to generate a steganagraphic text. Each type of LLM requires a custom prompt. For this approach we used Google Gemini.

#### Decode
The main approach to decode is:

1. Take the encoded messsage and identify the prepositions in the map.
2. Take the preposition and generate a list of 4 bit values
3. Merge the 4 bit values into 8 bit ASCII values or 8-32bits for Unicode
4. And render the binary values back to readable text

### Example

I describe the decoding process first as the method will be easier to understand.

#### Decode

To Decode the following: 
```text
The wind pushed against the ancient stone, a silent battle waged for dominion. 
Whispers spread about the mountain's secrets, tales shared with cautious awe. 
The peak stood defiant against the sky's relentless assault, carved deep by 
millennia. Life itself struggled against the harsh elements, enduring for 
another dawn.
```

1. Identify the prepositions and retrieve them in order: against,for,about,with,against,by,against,for
2. Map the prepositions to it's hex value: 74,65,73,74
3. Convert the hex value back to ascii which results in: test

#### Encode

If we wanted to encode "test";

1. We convert the text "text" to it's hex value: 74,65,73,74
2. Using the map described previously we get the following preposition list: against,for,about,with,against,by,against,for
3. We genreate the following Google Gemini Prompt: 
```text
Craft a concise and imaginative text, that seamlessly integrates the following 
word group. Word Group: against,for,about,with,against,by,against,for. Each word 
must be used only once, in the exact same order, and use no other prepositions. 
```
4. Google Gemini resulted in the following
```text
The wind pushed against the ancient stone, a silent battle waged for dominion. 
Whispers spread about the mountain's secrets, tales shared with cautious awe. 
The peak stood defiant against the sky's relentless assault, carved deep by 
millennia. Life itself struggled against the harsh elements, enduring for 
another dawn.
```


### Approach Comparision

#### Sample Conversions

StegGPT^4 was one of the few papers that provided generated codes - I'll compare the text encoded in this paper vs what was published by StegGPT authors.

To compare with StegGPT character vs word based approach:

|no|Secret Message[fn^2]|StegGPT Generated Text[fn^2]|Word Count|
|--|--------------------|----------------------------|-------------|
|1|Sezkgpyrtlq|These are not the true ones. I ’ve done my due to the amount Gloves, it doesalmost nothing to prevent it, the whole world needs to hear|28|
|2|xgelwoxlxh|But to be true to God and to be without one else. That way one would be the lastone to run and have the other team try to take you to my blog|34|
|3|aobeaboirg|The truth are the two that exist on the earth. The God of my life would not havecome to the same end. The game runs|26|
|4|nlﬁixgtql|Not to say not to that effect, or so you are not yet the same age of the game andage and age and age. These data also suggest that both the size|33|
|5|ywtqxbjysc|Not the ones that are the most recent of their names, that one name or one nameis the only way to know if the data were accurate to the latest version|32|
|6|kﬁlqfjicz|You’re not to use the money to do real estate, to do this for free and it would beamazing to do it if they felt entitled to it. The other end of the cable|35|
|7|smﬂttuqng|One does what they want to to hear, but to do the exact same job that was oncethe top of the game that you get is not to be found or to be able|35|
|8|aeauizmlsy|The truth is not only to get the latest, the team must start the day on the path tobe the head of one of his army, who took the battleﬁeld|31|
|9|bdkdnwulip|All were told that it was the end to my trip. The whole ride on one of em to proveits merit to the players it gives to us. There|30|
|10|usiukgexck|The fact about God is one of the most exalted and enduring and the father to yourbaby or to the same site by name or with|27|

There have been a proliferation in LLM encoding process that primarily used proprietary LLMs to generate cover text. A recent sub-approach has been classified as "Prompting Steganography" this approach is the closest to what has been described on this paper. When I started this project - "Prompting Steganography"^3 did not exist. This paper adds a prepositional based approach to the other Prompting Strategies already published.  


References:

1. https://pure.ulster.ac.uk/ws/portalfiles/portal/11638661/Text%20Based%20Steganography%20-%20IJPSI%20Pre-Print.pdf
2. https://itiis.org/journals/tiis/digital-library/manuscript/file/25527/TIIS%20Vol%2016,%20No%203-13.pdf
3. https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjOuo_G-o6SAxXQEFkFHQNbIBsQFnoECBgQAQ&url=https%3A%2F%2Flibrary.imaging.org%2Fadmin%2Fapis%2Fpublic%2Fapi%2Fist%2Fwebsite%2FdownloadArticle%2Fei%2F36%2F4%2FMWSF-338&usg=AOvVaw1igXiTR3PARwQDN75bFOiJ&opi=89978449
4. B.Krishnan,P. K.Thandra and M. S. Baba, "An overview of text steganography," 2017 Fourth International Conference on Signal Processing, Communication and Networking (ICSCN), Chennai, India, 2017, pp. 1-6, doi: 10.1109/ICSCN.2017.8085643.
