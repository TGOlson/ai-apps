import React from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';

import TokenInput from '../components/TokenInput';
import PromptInput from '../components/PromptInput';
import ResponseDisplay from '../components/ResponseDisplay';
import { Message, streamChatGPTCompletions } from '../util';

const App = () => {
  const storedToken = localStorage.getItem('opanai-token');

  const [token, setToken] = React.useState(storedToken ?? '');
  const [prompt, setPrompt] = React.useState('');
  const [response, setResponse] = React.useState<string | null>(null);

  const onTokenChange = (token: string) => {
    setToken(token);
    localStorage.setItem('opanai-token', token);
  };

  const onClick = () => {
    const messages: Message[] = [{
      role: 'user',
      content: prompt,
    }];

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
    <CssVarsProvider>
      <CssBaseline />
      
      <Stack direction='row'>
        <Stack sx={{gap: 2, width: 400, m: 2}}>
          <TokenInput onChange={onTokenChange} defaultValue={token}/>
          <PromptInput onChange={setPrompt}/>
          <Button onClick={onClick}>Submit</Button>
        </Stack>

        <Stack sx={{gap: 2, width: 500, m: 2}}>
          <ResponseDisplay value={response}/>
        </Stack>

      </Stack>
    </CssVarsProvider>
  );
};

export default App;
