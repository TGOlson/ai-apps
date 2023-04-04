import React from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';

// import PromptInput from '../components/PromptInput';
import ResponseDisplay from '../components/ResponseDisplay';
import { Message, streamChatGPTCompletions } from '../util';
import Header from '../components/Header';
import { Box, Card, Input, Typography } from '@mui/joy';

const App = () => {
  
  const [prompt, setPrompt] = React.useState('');
  const [response, setResponse] = React.useState<string | null>(null);

  const onClick = () => {
    void fetch(prompt)
      .then(response => response.text())
      .then(code => {

        const content = `
        You are an expert programmer in all languages. Given a code snippet, please provide a concise code review. 
        
        When reviewing the code, make sure you consider the following:
          * Bugs or other issues that would make things not work as expected
          * Security issues
          * Performance improvements
          * Code that would be complex to maintain, such as: code duplication, unclear variable and function names, etc.
          * Any other issues you can think of

        Please us the below template for your response:

        ---

        Programming language: {language}
        Code quality score (out of 10): {score}
        What this code does: {description} (in 200 words or less)
        
        Code review:
          1. Bugs: {bugs}
          2. Security: {security}
          3. Performance: {performance}
          4. Maintainability: {maintainability}
          5. Other: {other}

        ---

        Here is the code to review (do not include this in your response):
        ${code}
        `;

        const messages: Message[] = [{
          role: 'user',
          content: content,
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
    });
  };

  return (
    <CssVarsProvider>
      <CssBaseline />
        <Header />

        <Stack 
          direction='row' 
          sx={{gap: 2, m: 2, height: '100vh'}}
          justifyContent="center"
          alignItems="flex-start"
        >
        <Card variant="outlined" sx={{gap: 2, width: 350}}>
          <Box>
            <Typography level='h2'>Code Review</Typography>
            <Typography level='body2'>Squash bugs more quickly!</Typography>
          </Box>
          <Box>
            <Input onChange={e => setPrompt(e.target.value)} placeholder='https://...' size='sm' />
            <Typography sx={{mt: 1}} level='body3'>URL of code file (eg. https://raw.githubusercontent...)</Typography>
          </Box>

          <Button onClick={onClick} variant="soft">Submit</Button>
        </Card>

          <Box width='600px'>
            <ResponseDisplay value={response}/>

          </Box>
        </Stack>
    </CssVarsProvider>
  );
};

export default App;
