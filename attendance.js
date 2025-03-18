import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "/components/ui/table"
import { Calendar } from "lucide-react"

export default function SRMAttendanceManager() {
  const [attendanceEntries, setAttendanceEntries] = useState<{ className: string, date: string, status: 'present' | 'absent' }[]>([])
  const [className, setClassName] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState<'present' | 'absent'>('present')

  const addAttendanceEntry = () => {
    if (className && date) {
      setAttendanceEntries([...attendanceEntries, { className, date, status }])
      setClassName('')
      setDate('')
      setStatus('present')
    }
  }

  const totalClasses = attendanceEntries.length
  const attendedClasses = attendanceEntries.filter(entry => entry.status === 'present').length
  const attendancePercentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0
  const requiredAttendancePercentage = 75 // Assuming 75% is the required attendance
  const marginNeeded = requiredAttendancePercentage - attendancePercentage

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">SRM Attendance Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="className">Class Name</Label>
              <Input id="className" value={className} onChange={(e) => setClassName(e.target.value)} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <div className="relative mt-2">
                <Calendar className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <Label>Attendance Status</Label>
              <RadioGroup defaultValue="present" className="mt-2" value={status} onValueChange={(value) => setStatus(value as 'present' | 'absent')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="present" id="present" />
                  <Label htmlFor="present">Present</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="absent" id="absent" />
                  <Label htmlFor="absent">Absent</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button onClick={addAttendanceEntry} className="w-full">Log Attendance</Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.className}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Attendance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Total Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{totalClasses}</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Attended Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{attendedClasses}</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Percentage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{attendancePercentage.toFixed(2)}%</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Required Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{requiredAttendancePercentage}%</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Margin Needed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{marginNeeded > 0 ? `${marginNeeded.toFixed(2)}%` : 'None'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}