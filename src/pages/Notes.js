import React from 'react'
import { useEffect, useState } from 'react'
import { Container } from '@material-ui/core';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';


export default function Notes() {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    fetch('https://notes-app-ahmtadm.herokuapp.com/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])
  const handleDelete = async (id) => {
    await fetch('https://notes-app-ahmtadm.herokuapp.com/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }
  const breakPoints={
    default:3,
    1100:2,
    700:1
  }

  return (
    <Container maxWidth="xl">
    <Masonry
      breakpointCols={breakPoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
        {notes.map(note => (
          <div item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))}
     </Masonry>
      </Container>
  )
}
