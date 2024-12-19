import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MeetingList } from './components/MeetingList';
import { TranscriptionPanel } from './components/TranscriptionPanel';
import { NotesEditor } from './components/NotesEditor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TranscriptionPanel
                    isRecording={false}
                    onStartRecording={() => {}}
                    onStopRecording={() => {}}
                    transcription=""
                  />
                  <NotesEditor notes={[]} onAddNote={() => {}} />
                </div>
              }
            />
            <Route
              path="/reunioes"
              element={<MeetingList meetings={[]} onSelectMeeting={() => {}} />}
            />
            <Route
              path="/configuracoes"
              element={
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium mb-4">Configurações</h2>
                  <p className="text-gray-600">
                    Configurações do aplicativo serão implementadas aqui.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;