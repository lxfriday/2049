import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Board from '@pages/Board'
import Workspace from '@pages/Workspace'
import MyBoard from '@pages/Workspace/pages/MyBoard'
import Allways from '@pages/Workspace/pages/Allways'
import Analyze from '@pages/Workspace/pages/Analyze'
import Brainstorm from '@pages/Workspace/pages/Brainstorm'
import DesignThinking from '@pages/Workspace/pages/DesignThinking'
import EvaluationDecision from '@pages/Workspace/pages/EvaluationDecision'
import Guide from '@pages/Workspace/pages/Guide'
import JA from '@pages/Workspace/pages/JA'
import Leading from '@pages/Workspace/pages/Leading'
import Meeting from '@pages/Workspace/pages/Meeting'
import Practice from '@pages/Workspace/pages/Practice'
import Resources from '@pages/Workspace/pages/Resources'
import StrategicPlanning from '@pages/Workspace/pages/StrategicPlanning'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/workspace" element={<Workspace />}>
          <Route path="myboard" element={<MyBoard />} />
          <Route path="allways" element={<Allways />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="brainstorm" element={<Brainstorm />} />
          <Route path="designthinking" element={<DesignThinking />} />
          <Route path="evaluationdecision" element={<EvaluationDecision />} />
          <Route path="guide" element={<Guide />} />
          <Route path="ja" element={<JA />} />
          <Route path="leading" element={<Leading />} />
          <Route path="meeting" element={<Meeting />} />
          <Route path="practice" element={<Practice />} />
          <Route path="resources" element={<Resources />} />
          <Route path="strategicplanning" element={<StrategicPlanning />} />
          <Route path="/workspace/*" element={<Navigate to="/workspace/myboard" />} />
        </Route>
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<Navigate to="/workspace/myboard" />} />
      </Routes>
    </BrowserRouter>
  )
}
