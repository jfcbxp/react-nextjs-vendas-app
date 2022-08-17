interface MessageProps {
  tipo: string;
  texto: string;
  field?: string;
}

export interface Alert {
  tipo: string;
  field?: string;
  texto: string;
}

export const Message: React.FC<MessageProps> = ({ tipo, texto, field }) => {
  return (
    <article className={`message is-${tipo}`}>
      <div className="message-body">
        {field && `${field} :`}
        {texto}
      </div>
    </article>
  );
};
