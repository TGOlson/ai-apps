import React from 'react';

import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import ResponseDisplay from '../components/ResponseDisplay';
import { Message, streamChatGPTCompletions } from '../util';

const createPrompt = (description: string, sentiment: string): string => `
  You run a popular Twitter account with over a million followers, and want to write a tweet that will go viral.

  Draft a Tweet about "${description}" with a ${sentiment} sentiment.
  
  You have 280 characters to work with. Make sure the tweet is concise and to the point. Try to make the Tweet engaging and interesting.
`;

const TweetGen = () => {

  const [prompt, setPrompt] = React.useState('');
  const [response, setResponse] = React.useState<string | null>(null);

  const onClick = () => {
    const content = createPrompt(prompt, 'funny');

    const messages: Message[] = [{
      role: 'user',
      content,
    }];
        
    const token = localStorage.getItem('opanai-token');

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
      <Card variant="outlined" sx={{gap: 2, minWidth: 200, maxWidth: 350}}>
      <Box>
        <Typography level='h2'>Tweet Gen</Typography>
        <Typography level='body2'>Craft delightful tweets!</Typography>
      </Box>

      <Box>
        <Input onChange={e => setPrompt(e.target.value)} placeholder='Describe Tweet...' size='sm' />
        <Typography sx={{mt: 1}} level='body3'>URL of code file (eg. https://raw.githubusercontent...)</Typography>
      </Box>

      <Button onClick={onClick} variant="soft">Submit</Button>
    </Card>

    <Box sx={{minWidth: 400, maxWidth: 600, flexGrow: 1}}>
      <ResponseDisplay value={response}/>
    </Box>
    </React.Fragment>
  );
};

export default TweetGen;
