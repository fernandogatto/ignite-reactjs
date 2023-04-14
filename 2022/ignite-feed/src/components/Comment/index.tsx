import { useState } from 'react';

import { ThumbsUp, Trash } from 'phosphor-react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Avatar from '../Avatar';

import styles from './styles.module.css';

interface IComment {
  content: string;
  onDelete: (comment: string) => void;
}

function Comment({
  content,
  onDelete,
}: IComment) {
  const [likeCount, setLikeCount] = useState(0);

  const currentDate = new Date();

  const publisedDateFormatted = format(currentDate, "d 'de' LLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(currentDate, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleDeleteComment() {
    onDelete(content);
  }

  function handleLikeComment() {
    setLikeCount(likeCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/diego3g.png"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title={publisedDateFormatted} dateTime={currentDate.toISOString()}>{publishedDateRelativeToNow}</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Comment;
