
import { useState } from 'react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult 
} from '@hello-pangea/dnd';
import { 
  Trash2, 
  PlusCircle, 
  GripVertical, 
  Settings, 
  Copy, 
  Type, 
  CheckSquare, 
  FileText, 
  Calendar, 
  Upload, 
  AlignLeft,
  Save,
  Eye,
  ArrowLeft,
  PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner';

// Define field types
type FieldType = 
  | 'shortText' 
  | 'longText' 
  | 'singleChoice'
  | 'multipleChoice'
  | 'dropdown'
  | 'email'
  | 'phone'
  | 'date'
  | 'file'
  | 'heading'
  | 'paragraph';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  options?: string[];
}

// Field type definitions
const fieldTypes: {type: FieldType, label: string, icon: React.ReactNode}[] = [
  { type: 'shortText', label: 'Short Text', icon: <Type size={20} /> },
  { type: 'longText', label: 'Long Text', icon: <AlignLeft size={20} /> },
  { type: 'singleChoice', label: 'Single Choice', icon: <RadioGroupItem className="mt-0.5" /> },
  { type: 'multipleChoice', label: 'Multiple Choice', icon: <CheckSquare size={20} /> },
  { type: 'dropdown', label: 'Dropdown', icon: <PanelLeft size={20} /> },
  { type: 'email', label: 'Email', icon: <FileText size={20} /> },
  { type: 'phone', label: 'Phone Number', icon: <FileText size={20} /> },
  { type: 'date', label: 'Date', icon: <Calendar size={20} /> },
  { type: 'file', label: 'File Upload', icon: <Upload size={20} /> },
  { type: 'heading', label: 'Section Heading', icon: <Type size={20} /> },
  { type: 'paragraph', label: 'Paragraph Text', icon: <AlignLeft size={20} /> }
];

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Create empty field
const createEmptyField = (type: FieldType): FormField => ({
  id: generateId(),
  type,
  label: 'New Field',
  placeholder: '',
  description: '',
  required: false,
  options: type === 'singleChoice' || type === 'multipleChoice' || type === 'dropdown' 
    ? ['Option 1', 'Option 2', 'Option 3'] 
    : undefined
});

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('Client Onboarding Form');
  const [formDescription, setFormDescription] = useState('Please fill out this form to help us understand your project requirements better.');
  const [fields, setFields] = useState<FormField[]>([
    {
      id: generateId(),
      type: 'shortText',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      description: 'Please enter your full legal name',
      required: true
    },
    {
      id: generateId(),
      type: 'email',
      label: 'Email Address',
      placeholder: 'email@example.com',
      description: 'We\'ll use this for all communications',
      required: true
    },
    {
      id: generateId(),
      type: 'longText',
      label: 'Project Description',
      placeholder: 'Describe your project in detail',
      description: 'Include your goals, requirements, and any relevant information',
      required: true
    }
  ]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Get selected field
  const selectedField = fields.find(field => field.id === selectedFieldId);

  // Handle field selection
  const handleSelectField = (fieldId: string) => {
    setSelectedFieldId(fieldId);
  };

  // Add new field
  const handleAddField = (type: FieldType) => {
    const newField = createEmptyField(type);
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
    toast.success(`Added new ${type} field`);
  };

  // Update field
  const handleUpdateField = (fieldId: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  // Delete field
  const handleDeleteField = (fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
    toast.success('Field deleted');
  };

  // Duplicate field
  const handleDuplicateField = (fieldId: string) => {
    const fieldToDuplicate = fields.find(field => field.id === fieldId);
    if (fieldToDuplicate) {
      const duplicatedField = {
        ...fieldToDuplicate,
        id: generateId(),
        label: `${fieldToDuplicate.label} (Copy)`
      };
      
      const fieldIndex = fields.findIndex(field => field.id === fieldId);
      const updatedFields = [...fields];
      updatedFields.splice(fieldIndex + 1, 0, duplicatedField);
      
      setFields(updatedFields);
      setSelectedFieldId(duplicatedField.id);
      toast.success('Field duplicated');
    }
  };

  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setFields(items);
  };

  // Add option to a field
  const handleAddOption = (fieldId: string) => {
    setFields(fields.map(field => {
      if (field.id === fieldId && field.options) {
        return {
          ...field,
          options: [...field.options, `Option ${field.options.length + 1}`]
        };
      }
      return field;
    }));
  };

  // Update option in a field
  const handleUpdateOption = (fieldId: string, optionIndex: number, value: string) => {
    setFields(fields.map(field => {
      if (field.id === fieldId && field.options) {
        const updatedOptions = [...field.options];
        updatedOptions[optionIndex] = value;
        return {
          ...field,
          options: updatedOptions
        };
      }
      return field;
    }));
  };

  // Delete option from a field
  const handleDeleteOption = (fieldId: string, optionIndex: number) => {
    setFields(fields.map(field => {
      if (field.id === fieldId && field.options && field.options.length > 1) {
        const updatedOptions = [...field.options];
        updatedOptions.splice(optionIndex, 1);
        return {
          ...field,
          options: updatedOptions
        };
      }
      return field;
    }));
  };

  // Save form
  const handleSaveForm = () => {
    // Simulate saving
    toast.success('Form saved successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-4 border-b border-border mb-6">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <h1 className="text-2xl font-bold">Form Builder</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant={isPreviewMode ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                {isPreviewMode ? (
                  <>
                    <Settings className="h-4 w-4 mr-1" /> Edit
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" /> Preview
                  </>
                )}
              </Button>
              
              <Button size="sm" onClick={handleSaveForm}>
                <Save className="h-4 w-4 mr-1" /> Save Form
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Canvas */}
            <div className="lg:col-span-8">
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <Input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="text-2xl font-bold border-none p-0 mb-2 focus-visible:ring-0"
                  disabled={isPreviewMode}
                />
                <Textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="resize-none text-muted-foreground border-none p-0 focus-visible:ring-0"
                  disabled={isPreviewMode}
                />
              </div>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="form-fields">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {fields.map((field, index) => (
                        <Draggable 
                          key={field.id} 
                          draggableId={field.id} 
                          index={index}
                          isDragDisabled={isPreviewMode}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-card border rounded-lg transition-all ${
                                selectedFieldId === field.id && !isPreviewMode
                                  ? 'border-primary ring-1 ring-primary/20'
                                  : 'border-border'
                              }`}
                              onClick={() => !isPreviewMode && handleSelectField(field.id)}
                            >
                              <div className="p-4">
                                {!isPreviewMode && (
                                  <div className="flex items-center justify-between mb-3">
                                    <div 
                                      {...provided.dragHandleProps}
                                      className="flex items-center text-muted-foreground text-sm"
                                    >
                                      <GripVertical className="h-4 w-4 mr-1" />
                                      <span>{fieldTypes.find(f => f.type === field.type)?.label || field.type}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDuplicateField(field.id);
                                        }}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteField(field.id);
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Rendered Fields */}
                                <div className={isPreviewMode ? '' : 'pointer-events-none opacity-80'}>
                                  {field.type === 'heading' ? (
                                    <h2 className="text-xl font-bold mb-1">{field.label}</h2>
                                  ) : field.type === 'paragraph' ? (
                                    <p className="text-muted-foreground">{field.label}</p>
                                  ) : (
                                    <>
                                      <div className="flex items-baseline justify-between mb-1.5">
                                        <Label htmlFor={field.id} className="text-base">
                                          {field.label}
                                          {field.required && <span className="text-destructive ml-1">*</span>}
                                        </Label>
                                      </div>
                                      
                                      {field.description && (
                                        <p className="text-sm text-muted-foreground mb-2">{field.description}</p>
                                      )}
                                      
                                      {field.type === 'shortText' && (
                                        <Input id={field.id} placeholder={field.placeholder} />
                                      )}
                                      
                                      {field.type === 'longText' && (
                                        <Textarea id={field.id} placeholder={field.placeholder} />
                                      )}
                                      
                                      {field.type === 'email' && (
                                        <Input id={field.id} type="email" placeholder={field.placeholder} />
                                      )}
                                      
                                      {field.type === 'phone' && (
                                        <Input id={field.id} type="tel" placeholder={field.placeholder} />
                                      )}
                                      
                                      {field.type === 'date' && (
                                        <Input id={field.id} type="date" />
                                      )}
                                      
                                      {field.type === 'file' && (
                                        <Input id={field.id} type="file" />
                                      )}
                                      
                                      {field.type === 'singleChoice' && field.options && (
                                        <RadioGroup>
                                          {field.options.map((option, i) => (
                                            <div key={i} className="flex items-center space-x-2 mt-2">
                                              <RadioGroupItem value={option} id={`${field.id}-option-${i}`} />
                                              <Label htmlFor={`${field.id}-option-${i}`}>{option}</Label>
                                            </div>
                                          ))}
                                        </RadioGroup>
                                      )}
                                      
                                      {field.type === 'multipleChoice' && field.options && (
                                        <div className="space-y-2 mt-1">
                                          {field.options.map((option, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                              <Checkbox id={`${field.id}-option-${i}`} />
                                              <Label htmlFor={`${field.id}-option-${i}`}>{option}</Label>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      
                                      {field.type === 'dropdown' && field.options && (
                                        <Select>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select an option" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {field.options.map((option, i) => (
                                              <SelectItem key={i} value={option}>{option}</SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              {!isPreviewMode && (
                <div className="mt-6 text-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <PlusCircle className="h-4 w-4 mr-2" /> Add New Field
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[300px]">
                      <SheetHeader>
                        <SheetTitle>Add Field</SheetTitle>
                      </SheetHeader>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                        {fieldTypes.map((fieldType) => (
                          <Card 
                            key={fieldType.type} 
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => {
                              handleAddField(fieldType.type);
                              document.querySelector('[data-radix-popper-content-wrapper]')?.querySelector('button')?.click();
                            }}
                          >
                            <CardContent className="flex flex-col items-center justify-center text-center p-4">
                              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                                {fieldType.icon}
                              </div>
                              <span className="text-sm font-medium">{fieldType.label}</span>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              )}
              
              {isPreviewMode && fields.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <Button>Submit Form</Button>
                </div>
              )}
            </div>

            {/* Properties Panel */}
            {!isPreviewMode && (
              <div className="lg:col-span-4">
                <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                  <h3 className="font-medium mb-4">Field Properties</h3>
                  
                  {selectedField ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="field-label">Field Label</Label>
                        <Input
                          id="field-label"
                          value={selectedField.label}
                          onChange={(e) => handleUpdateField(selectedField.id, { label: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      
                      {!['heading', 'paragraph'].includes(selectedField.type) && (
                        <div className="flex items-center justify-between">
                          <Label htmlFor="field-required">Required Field</Label>
                          <Switch
                            id="field-required"
                            checked={selectedField.required}
                            onCheckedChange={(checked) => 
                              handleUpdateField(selectedField.id, { required: checked })
                            }
                          />
                        </div>
                      )}
                      
                      {!['heading', 'paragraph', 'singleChoice', 'multipleChoice', 'dropdown', 'file', 'date'].includes(selectedField.type) && (
                        <div>
                          <Label htmlFor="field-placeholder">Placeholder</Label>
                          <Input
                            id="field-placeholder"
                            value={selectedField.placeholder || ''}
                            onChange={(e) => 
                              handleUpdateField(selectedField.id, { placeholder: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor="field-description">Help Text</Label>
                        <Textarea
                          id="field-description"
                          value={selectedField.description || ''}
                          onChange={(e) => 
                            handleUpdateField(selectedField.id, { description: e.target.value })
                          }
                          className="mt-1"
                          placeholder="Add a description or instructions"
                        />
                      </div>
                      
                      {['singleChoice', 'multipleChoice', 'dropdown'].includes(selectedField.type) && selectedField.options && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Options</Label>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAddOption(selectedField.id)}
                            >
                              Add Option
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            {selectedField.options.map((option, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => 
                                    handleUpdateOption(selectedField.id, index, e.target.value)
                                  }
                                />
                                {selectedField.options && selectedField.options.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-destructive"
                                    onClick={() => handleDeleteOption(selectedField.id, index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Select a field to edit its properties</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FormBuilder;
