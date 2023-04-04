import { ChangeEvent, FormEvent, useState } from 'react';

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
  type: 'paragraph' | 'link';
  content: string;
}

export interface IPost {
  id?: number;
  author: IAuthor;
  content: Array<IContent>;
  publishedAt: Date;
}

function Post({
  author,
  content,
  publishedAt,
}: IPost) {
  const [comments, setComments] = useState<Array<string>>([]);
  const [newComment, setNewComment] = useState('');

  const publisedDateFormatted = format(publishedAt, "d 'de' LLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');

    const value = event.target.value;

    setNewComment(value);
  }

  function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function handleCreateNewComment(event: FormEvent) {
    event?.preventDefault();

    setComments([...comments, newComment]);

    setNewComment('');
  }

  function handleDeleteComment(comment: string) {
    const filteredComments = comments.filter(item => item !== comment);

    setComments(filteredComments);
  }

  const isNewCommentEmpty = newComment.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

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
            return <p key={item.content}>{item.content}</p>
          } else if (item.type === 'link') {
            return <p key={item.content}><a href="">{item.content}</a></p>
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
          onInvalid={handleNewCommentInvalid}
        />

        <footer>
          <button
            type="submit"
            disabled={isNewCommentEmpty}
          >
            Comentar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.length > 0 && comments.map (item => (
          <Comment
            key={item}
            content={item}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  );
}

export default Post;
