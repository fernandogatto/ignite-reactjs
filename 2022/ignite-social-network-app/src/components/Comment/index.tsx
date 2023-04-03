import { ThumbsUp, Trash } from 'phosphor-react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Avatar from '../Avatar';

import styles from './styles.module.css';

interface IComment {
  content: string;
}

function Comment({
  content,
}: IComment) {
  const currentDate = new Date();

  const publisedDateFormatted = format(currentDate, "d 'de' LLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(currentDate, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        source="https://github.com/diego3g.png"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title={publisedDateFormatted} dateTime={currentDate.toISOString()}>{publishedDateRelativeToNow}</time>
            </div>

            <button title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Comment;
