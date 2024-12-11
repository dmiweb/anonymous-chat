import { useEffect, useState } from 'react';

type FormAddMessageProps = {
  onAddMessage: (message: string) => void
}

const FormAddMessage = ({ onAddMessage }: FormAddMessageProps): JSX.Element => {
  const [form, setForm] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { currentTarget } = event;

    if (!currentTarget.message.value) return;
    
    setForm(currentTarget.message.value);

    currentTarget.message.value = '';
  }

  useEffect(() => {
    if(form !== '') onAddMessage(form);
  }, [form]);

  return (
    <form className='chat__form-add-message form' onSubmit={handleSubmit}>
      <input type="text" className='form__input' name='message' required />
      <button type='submit' className='form__send-btn'></button>
    </form>
  );
};

export default FormAddMessage;