import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/accordion';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Progress } from '@repo/ui/components/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui/components/sheet';
import { Skeleton } from '@repo/ui/components/skeleton';
import { Slider } from '@repo/ui/components/slider';
import { Switch } from '@repo/ui/components/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import type { ThemeColors } from '../theme-editor';
import { CardPreview } from './card-preview';

interface ComponentShowcaseProps {
  colors: ThemeColors;
  onColorChange: (key: string, value: string) => void;
}

export function ComponentShowcase({
  colors,
  onColorChange,
}: ComponentShowcaseProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('components');

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="cards">Cards and Text</TabsTrigger>
        </TabsList>
        <TabsContent value="components" className="space-y-12 p-6">
          {/* Basic Components Section */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Components</CardTitle>
              <CardDescription>
                Buttons, inputs, and other basic components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Buttons Section */}
              <div className="space-y-2">
                <Label>Buttons</Label>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              {/* Input and Label Section */}
              <div className="space-y-4">
                <Label>Input and Label</Label>
                <div className="grid gap-4 max-w-sm">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Select Section */}
              <div className="space-y-4">
                <Label>Select Dropdown</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Components Section */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Components</CardTitle>
              <CardDescription>
                Components with more complex interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Accordion Section */}
              <div className="space-y-2">
                <Label>Accordion</Label>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is this an accordion?</AccordionTrigger>
                    <AccordionContent>
                      Yes, this is an accordion component from Shadcn.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Can it have multiple sections?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, you can add as many sections as you need.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Dialog Section */}
              <div className="space-y-2">
                <Label>Dialog</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This is a dialog component that can be used for
                        important questions or information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Checkbox Section */}
              <div className="space-y-4">
                <Label>Checkbox</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <label
                      htmlFor="newsletter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Receive newsletter
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Components Section */}
          <Card>
            <CardHeader>
              <CardTitle>Visual Components</CardTitle>
              <CardDescription>
                Components for visual feedback and status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Progress and Slider Section */}
              <div className="space-y-4">
                <Label>Progress and Slider</Label>
                <Progress value={66} className="w-[60%]" />
                <div className="w-[60%]">
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </div>

              {/* Avatar Section */}
              <div className="space-y-4">
                <Label>Avatar</Label>
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://github.com/radix-ui.png" />
                    <AvatarFallback>RU</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Skeleton Section */}
              <div className="space-y-4">
                <Label>Skeleton</Label>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>

              {/* Switch Section */}
              <div className="flex items-center space-x-2">
                <Switch id="theme-mode" />
                <Label htmlFor="theme-mode">Tema Modus</Label>
              </div>
            </CardContent>
          </Card>

          {/* Toast Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Toast og andre varsler</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() =>
                  toast('Dette er en toast-melding', {
                    description: 'Toast-meldinger kan vise viktig informasjon.',
                  })
                }
              >
                Vis Toast
              </Button>
            </CardContent>
          </Card>

          {/* Layout Components Section */}
          <Card>
            <CardHeader>
              <CardTitle>Layout Components</CardTitle>
              <CardDescription>
                Sidebar, Sheet, Drawer, and other layout components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Sidebar Demo */}
              <div className="space-y-4">
                <Label>Sidebar</Label>
                <div className="border rounded-lg overflow-hidden">
                  <div
                    className={`
                    w-64 bg-sidebar text-sidebar-foreground border-r shrink-0
                    transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    absolute md:relative md:translate-x-0
                  `}
                  >
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Sidebar Demo</h3>
                    </div>
                    <nav className="p-4 space-y-2">
                      <a
                        href="#"
                        className="block px-2 py-1 rounded hover:bg-sidebar-primary/10"
                      >
                        Home
                      </a>
                      <a
                        href="#"
                        className="block px-2 py-1 rounded hover:bg-sidebar-primary/10"
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-2 py-1 rounded hover:bg-sidebar-primary/10"
                      >
                        Settings
                      </a>
                    </nav>
                  </div>
                  <div className="flex-1 p-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className="md:hidden"
                    >
                      {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
                    </Button>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        This is the main content. The sidebar is always visible
                        on desktop and can be toggled on mobile.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sheet/Drawer Demo */}
              <div className="space-y-4">
                <Label>Sheet / Drawer</Label>
                <div className="flex gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet (Right)</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>
                          This is a sheet that opens from the right side of the
                          screen. Sheets are useful for secondary content or
                          forms.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Example Input</Label>
                            <Input placeholder="Type something..." />
                          </div>
                          <Button className="w-full">Save changes</Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet (Left)</Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Left Sheet</SheetTitle>
                        <SheetDescription>
                          This is a sheet that opens from the left side.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Tooltip Demo */}
              <div className="space-y-4">
                <Label>Tooltips</Label>
                <div className="flex flex-wrap gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me!</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a tooltip with simple text</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary">Med ikon</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex items-center gap-2">
                          <Menu size={14} />
                          <p>Tooltip with icon</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="default">Kompleks</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-2">
                          <p className="font-medium">Advanced tooltip</p>
                          <p className="text-xs text-muted-foreground">
                            This is a more complex tooltip with multiple lines
                            and formatted content.
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cards">
          <CardPreview
            colors={{
              background: colors.background,
              foreground: colors.foreground,
              card: colors.card,
              'card-foreground': colors['card-foreground'],
              muted: colors.muted,
              'muted-foreground': colors['muted-foreground'],
            }}
            onColorChange={onColorChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
