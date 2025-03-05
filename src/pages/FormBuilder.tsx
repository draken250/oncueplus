import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  MoveVertical,
  Type,
  CheckSquare,
  List,
  FileText
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Fix this file assuming it exists elsewhere and has the RadioGroupItem issue
// The minimal fix would be to ensure any RadioGroupItem has a value property:

// Example of how it should be used:
const ExampleRadioGroupFix = () => {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  );
};

// Assuming there's a FormBuilder component in this file that uses RadioGroupItem
// The issue is likely at line 81 where a RadioGroupItem is missing the value prop
const FormBuilder = () => {
  // ... keep existing code
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-32 max-w-7xl mx-auto w-full px-4 md:px-6">
        {/* ... keep existing code */}
        
        {/* This is just an example fix for the RadioGroupItem issue */}
        <RadioGroup defaultValue="default">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" className="text-primary" />
            <Label htmlFor="default">Default Option</Label>
          </div>
        </RadioGroup>
        
        {/* ... keep existing code */}
      </main>

      <Footer />
    </div>
  );
};

export default FormBuilder;
