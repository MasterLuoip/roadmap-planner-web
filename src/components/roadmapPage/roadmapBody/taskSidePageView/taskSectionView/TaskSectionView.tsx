import { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
} from '@material-ui/core';
import { SectionWrapper } from './TaskSectionViewStyle';
import { TaskSection } from '../TaskSidePageView';
import { nanoid } from 'nanoid';

type TaskSectionComponentProp = {
  section: Omit<TaskSection, 'id'>;
  onSectionChange: (newSection: Omit<TaskSection, 'id'>) => void;
};

export function TaskSectionView({
  section,
  onSectionChange,
}: TaskSectionComponentProp): JSX.Element {
  // const [section, setSection] = useState(section);
  const [mdText, setMdText] = useState(section.text);
  const [tasks, setTasks] = useState(section.tasks);
  // const [mdText, setMdText] = useState(section.text);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const newSection: Omit<TaskSection, 'id'> = {
      tasks,
      text: mdText,
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
          label: 'new item',
        },
      ];
    });
  };

  const onLabelChange = (id: string, value: string) => {
    setTasks((tasks) => {
      return tasks.map((task) => {
        task.label = task.id === id ? value : task.label;
        return task;
      });
    });
  };
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
              <IconButton
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
            component='span'
            onClick={() => setShowEditor(true)}
            style={{ marginLeft: '-13px' }}
          >
            <EditIcon color='primary' />
          </IconButton>
        )}
      </div>

      <FormControl component='fieldset'>
        {tasks.map((task, index) =>
          showEditor ? (
            <FormControl component='fieldset' key={index}>
              <div style={{ marginBottom: '20px' }}>
                <IconButton
                  size='small'
                  component='span'
                  onClick={() => onTaskDelete(task.id)}
                >
                  <CloseIcon style={{ color: 'red' }} />
                </IconButton>
                <TextField
                  aria-describedby='my-helper-text'
                  value={task.label}
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
                  name={task.label}
                  color='primary'
                />
              }
              label={task.label}
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
