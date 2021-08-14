import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
// import style manually
import ReactMarkdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { StageSection } from '../TaskSidePageView';
import { SectionWrapper } from './TaskSectionViewStyle';

type TaskSectionComponentProp = {
  section: Omit<StageSection, 'id'>;
  onSectionChange: (newSection: Omit<StageSection, 'id'>) => void;
  onSectionDelete: () => void;
};

export function TaskSectionView({
  section,
  onSectionChange,
  onSectionDelete,
}: TaskSectionComponentProp): JSX.Element {
  const [mdText, setMdText] = useState(section.content);
  const [tasks, setTasks] = useState(section.checkpoints);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const newSection: Omit<StageSection, 'id'> = {
      checkpoints: tasks,
      content: mdText,
    };
    onSectionChange(newSection);
  }, [mdText, tasks]);

  function handleEditorChange({ text }: { text: string }) {
    setMdText(text);
  }
  const onTaskDelete = (id: string) => {
    setTasks((tasks) => {
      return tasks.filter((filter) => filter.id !== id);
    });
  };
  const onTaskCheck = (id: string) => {
    setTasks((tasks) => {
      return tasks.map((task) => {
        task.completed = task.id === id ? !task.completed : task.completed;
        return task;
      });
    });
  };
  const onTaskAdd = () => {
    setTasks((tasks) => {
      return [
        ...tasks,
        {
          id: nanoid(),
          completed: false,
          content: 'new item',
        },
      ];
    });
  };

  const onLabelChange = (id: string, value: string) => {
    setTasks((tasks) => {
      return tasks.map((task) => {
        task.content = task.id === id ? value : task.content;
        return task;
      });
    });
  };
  return (
    <SectionWrapper>
      <div>
        {showEditor ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              <Button
                variant='outlined'
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  marginBottom: '20px',
                }}
                onClick={onSectionDelete}
              >
                Delete
              </Button>
            </div>
            <div>
              <IconButton
                data-testid='TaskSectionView-taskAddIcon'
                size='small'
                style={{ marginBottom: '10px' }}
                onClick={onTaskAdd}
              >
                <AddIcon style={{ color: 'green' }} />
              </IconButton>
            </div>
          </>
        ) : (
          <IconButton
            data-testid='TaskSectionView-editIcon'
            component='span'
            onClick={() => setShowEditor(true)}
            style={{ marginLeft: '-13px' }}
          >
            <EditIcon />
          </IconButton>
        )}
      </div>

      <FormControl component='fieldset'>
        {tasks.map((task, index) =>
          showEditor ? (
            <FormControl component='fieldset' key={index}>
              <div style={{ marginBottom: '20px' }}>
                <IconButton
                  data-testid='TaskSectionView-deleteTaskBtn'
                  size='small'
                  component='span'
                  onClick={() => onTaskDelete(task.id)}
                >
                  <CloseIcon style={{ color: 'red' }} />
                </IconButton>
                <TextField
                  data-testid='TaskSectionView-nameInput'
                  value={task.content}
                  onChange={(e) => onLabelChange(task.id, e.target.value)}
                  size='small'
                />
              </div>
            </FormControl>
          ) : (
            <FormControlLabel
              key={task.id}
              control={
                <Checkbox
                  checked={task.completed}
                  onChange={() => onTaskCheck(task.id)}
                  name={task.content}
                  color='primary'
                />
              }
              label={task.content}
            />
          )
        )}
      </FormControl>
      {showEditor && (
        <MdEditor
          value={mdText}
          style={{ height: '500px', marginTop: '30px' }}
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
