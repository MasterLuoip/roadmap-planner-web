import { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import AddIcon from '@material-ui/icons/Add';

import EditIcon from '@material-ui/icons/Edit';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
} from '@material-ui/core';
import { SectionWrapper } from './TaskSectionViewStyle';

export type TaskSection = {
  id: string;
  tasks: {
    completed: boolean;
    label: string;
  }[];
  text: string;
};

type TaskSectionComponentProp = {
  tasks: TaskSection['tasks'];
  text: string;
  onTaskCheck: (value: boolean, taskIndex: number) => void;
  onTextChange: (text: string) => void;
};

export function TaskSectionView({
  tasks,
  text,
  onTaskCheck,
  onTextChange,
}: TaskSectionComponentProp): JSX.Element {
  const [mdText, setMdText] = useState(text);
  const [showEditor, setShowEditor] = useState(false);
  function handleEditorChange({ html, text }: { html: string; text: string }) {
    setMdText(text);
    onTextChange(text);
  }
  return (
    <SectionWrapper>
      <div>
        {showEditor ? (
          <>
            <div>
              <Button
                variant='outlined'
                style={{
                  backgroundColor: '#ff6d00',
                  color: 'white',
                  marginBottom: '20px',
                }}
                onClick={() => setShowEditor(false)}
              >
                Save
              </Button>
            </div>
            <div>
              <IconButton size='small' style={{ marginLeft: '-5px' }}>
                <AddIcon style={{ color: 'green' }} />
              </IconButton>
            </div>
          </>
        ) : (
          <IconButton
            component='span'
            onClick={() => setShowEditor(true)}
            style={{ marginLeft: '-13px' }}
          >
            <EditIcon color='primary' />
          </IconButton>
        )}
      </div>
      <FormControl component='fieldset'>
        {tasks.map((task, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={task.completed}
                onChange={(e) => onTaskCheck(e.target.checked, index)}
                name={task.label}
                color='primary'
              />
            }
            label={task.label}
          />
        ))}
      </FormControl>
      {showEditor && (
        <MdEditor
          value={mdText}
          style={{ height: '500px' }}
          config={{
            view: {
              menu: true,
              md: true,
              html: false,
              hideMenu: true,
            },
            canView: {
              fullScreen: false,
              html: false,
              preview: false,
            },
            table: {
              maxRow: 5,
              maxCol: 6,
            },
            syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
          }}
          plugins={['fonts']}
          renderHTML={(text) => <></>}
          onChange={handleEditorChange}
        />
      )}

      <div>
        <div>
          <ReactMarkdown children={mdText} />
        </div>
      </div>
    </SectionWrapper>
  );
}
