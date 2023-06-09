import React from 'react';

import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import ResponseDisplay from '../components/ResponseDisplay';
import { Message, streamChatGPTCompletions } from '../util';
import { useOpenAIToken } from '../hooks/useOpenAIToken';

const createPrompt = (code: string): string => `
You are an expert programmer in all programming languages. A peer programmer has asked you to review their code.
Given a code snippet, please provide a concise code review, with actionable suggestions for improvement.

When reviewing the code, make sure you consider the following:
  * Bugs or other issues that would make things not work as expected
  * Security issues
  * Performance improvements
  * Code that would be complex to maintain, such as: code duplication, unclear variable and function names, etc.
  * Any other issues you can think of

Please us the below template for your response:

-template start-

Programming language: {language}
Code quality score (out of 10): {score}

What this code does: {description} (in 100 words or less)

Code review:

  1. Bugs: {bugs}
  2. Security: {security}
  3. Performance: {performance}
  4. Maintainability: {maintainability}
  5. Other: {other}

-template end-

Here is the code to review (do not include this in your response):
${code}
`;

const CodeReview = () => {

  const [codeUrl, setCodeUrl] = React.useState('');
  const [response, setResponse] = React.useState<string | null>(null);
  const [getToken, _] = useOpenAIToken();

  const onClick = () => {
    void fetch(codeUrl)
      .then(response => response.text())
      .then(code => {

        const content = createPrompt(code);

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
    });
  };


  return (
    <React.Fragment>
      <Card variant="outlined" sx={{gap: 2, width: 350}}>
      <Box>
        <Typography level='h2'>Code Review</Typography>
        <Typography level='body2'>Bug squashin&apos;</Typography>
      </Box>

      <Box>
        <Input onChange={e => setCodeUrl(e.target.value)} placeholder='https://...' size='sm' />
        <Typography sx={{mt: 1}} level='body3'>URL of code file (eg. https://raw.githubusercontent...)</Typography>
      </Box>

      <Button onClick={onClick} variant="outlined" disabled={!(codeUrl)}>Submit</Button>
    </Card>

    <Box sx={{minWidth: 400, maxWidth: 600, flexGrow: 1}}>
      <ResponseDisplay value={response}/>
    </Box>
    </React.Fragment>
  );
};

export default CodeReview;
