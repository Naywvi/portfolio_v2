'use client';

import React from 'react';
import { SkillTreeVisualization } from './SkillTreeVisualization';
import skillsData from '../data.json';

export function SkillTree() {
  return <SkillTreeVisualization data={skillsData} />;
}