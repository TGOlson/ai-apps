import React from 'react';

import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import ResponseDisplay from '../components/ResponseDisplay';
import { Message, streamChatGPTCompletions } from '../util';
import { Option, Select, Textarea } from '@mui/joy';
import { useOpenAIToken } from '../hooks/useOpenAIToken';

const createPrompt = (description: string, sentiment: string): string => `
  You run a popular Twitter account with over a million followers, and want to write a new Tweet that will go viral. 

  Write a ${sentiment} Tweet about "${description}". Make your response the Tweet itself, and do not include any other text. Do not adds quotes around the Tweet.

  Use the following guidelines when drafting your tweet:

  * Do NOT use more than 280 total characters in the Tweet
  * Use any formatting or emojis seem to make sense for the Tweet
  * Do NOT use hashtags (eg. #) unless specifically asked for in the description
  * Make sure the tweet is concise and to the point, but also engaging and interesting

`;

const TweetGen = () => {

  const [tweetDescription, setTweetDescription] = React.useState('');
  const [tweetSentiment, setTweetSentiment] = React.useState('');
  const [response, setResponse] = React.useState<string | null>(null);
  const [getToken, _] = useOpenAIToken();

  const onClick = () => {
    const content = createPrompt(tweetDescription, tweetSentiment);
    
    const messages: Message[] = [{
      role: 'user',
      content,
    }];
    
    const token = getToken();

    if (!token) {
      // todo: handler more gracefully
      throw new Error('No token found');
    }

    streamChatGPTCompletions({token}, messages)
      .then(async (stream) => {
        const reader = stream.getReader();
        
      let result = '';

      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
        
        const delta = value.choices[0]?.delta.content;
        if (delta !== undefined) result += delta;
        
        setResponse(result);
      }
    }).catch(error => {
      console.error(error);
    });
  };


  return (
    <React.Fragment>
      <Card variant="outlined" sx={{gap: 2, width: 350}}>
      <Box>
        <Typography level='h2'>Tweet Gen</Typography>
        <Typography level='body2'>Craft delightful tweets!</Typography>
      </Box>

      <Box>
        <Textarea minRows={3} onChange={e => setTweetDescription(e.target.value)} placeholder='Describe a Tweet...' size='sm' />
        <Typography sx={{mt: 1}} level='body3'>Describe a Tweet you want. No need to be concise. Add details about format and hastags if you want &apos;em!</Typography>
      </Box>
      <Box>
        <Select size='sm' placeholder='Select sentiment...' onChange={(_e, newValue) => setTweetSentiment(newValue as string)}>
          <Option value="funny">Funny</Option>
          <Option value="inspiring">Inspiring</Option>
          <Option value="controversial">Controversial</Option>
          <Option value="serious">Serious</Option>
          <Option value="informative">Informative</Option>
          <Option value="emotional">Emotional</Option>
        </Select>
        <Typography sx={{mt: 1}} level='body3'>Select what sentiment you want the Tweet to have. </Typography>
      </Box>

      <Button onClick={onClick} variant="outlined" disabled={!(tweetDescription && tweetSentiment)}>Submit</Button>
    </Card>

    <Box sx={{minWidth: 400, maxWidth: 600, flexGrow: 1}}>
      <ResponseDisplay value={response}/>
    </Box>
    </React.Fragment>
  );
};

export default TweetGen;
