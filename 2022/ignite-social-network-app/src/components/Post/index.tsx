import { useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Avatar from '../Avatar';
import Comment from '../Comment';

import styles from './styles.module.css';

interface IAuthor {
  avatarUrl: string;
  name: string;
  role: string;
}

interface IContent {
  type: string;
  content: string;
}

interface IPost {
  author: IAuthor;
  content: Array<IContent>;
  publishedAt: Date;
}

function Post({
  author,
  content,
  publishedAt,
}: IPost) {
  const [comments, setComments] = useState<Array<String>>([]);
  const [newComment, setNewComment] = useState('');

  const publisedDateFormatted = format(publishedAt, "d 'de' LLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange() {
    event?.preventDefault();

    const value = event.target.value;

    setNewComment(value);
  }

  function handleCreateNewComment() {
    event?.preventDefault();

    setComments([...comments, newComment]);

    setNewComment('');
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar source={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publisedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {content.length > 0 && content.map(item => {
          if (item.type === 'paragraph') {
            return <p>{item.content}</p>
          } else if (item.type === 'link') {
            return <p><a href="">{item.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe seu comentário"
          name="newComment"
          value={newComment}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type="submit">Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.length > 0 && comments.map (item => (
          <Comment
            content={item}
          />
        ))}
      </div>
    </article>
  );
}

export default Post;
