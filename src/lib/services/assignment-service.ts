export interface AssignmentGroup {
  id: number
  name: string
  is_active: boolean
  created_at: number
}

export interface Assignment {
  id: number
  name: string
  description: string
  due: string
  active: boolean
  is_link: boolean
  task_group_id: number
  created_at: number
}

export interface Submission {
  id: number
  name: string
  path?: string
  link?: string
  user_id: number
  sub_task_id: number
  created_at: number
}

export interface DayData {
  day: string
  tasks: Assignment[]
}

class AssignmentService {
  private baseUrl = '/api/data'

  async fetchAssignmentGroups(): Promise<AssignmentGroup[]> {
    try {
      const response = await fetch(`${this.baseUrl}/assignmentGroups`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching assignment groups:', error)
      throw error
    }
  }

  async fetchAssignments(): Promise<Assignment[]> {
    try {
      const response = await fetch(`${this.baseUrl}/assignments`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching assignments:', error)
      throw error
    }
  }

  async fetchSubmissions(): Promise<Submission[]> {
    try {
      const response = await fetch(`${this.baseUrl}/submissions`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching submissions:', error)
      throw error
    }
  }

  async fetchSubmissionsByAssignment(assignmentId: number): Promise<Submission[]> {
    try {
      const response = await fetch(`${this.baseUrl}/submissions`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const allSubmissions = await response.json()
      return allSubmissions.filter((submission: Submission) => submission.sub_task_id === assignmentId)
    } catch (error) {
      console.error('Error fetching submissions by assignment:', error)
      throw error
    }
  }

  /* async deleteSubmission(submissionId: number): Promise<{ message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/submissions?id=${submissionId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting submission:', error)
      throw error
    }
  } */

  async submitAssignment(
    assignmentId: number,
    name: string,
    file?: File,
    link?: string
  ): Promise<{ message: string; data: Submission }> {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('sub_task_id', assignmentId.toString())
      
      if (file) {
        formData.append('file', file)
      }
      
      if (link) {
        formData.append('link', link)
      }

      const response = await fetch(`${this.baseUrl}/submissions`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error submitting assignment:', error)
      throw error
    }
  }

  // Transform API data to the format expected by the UI
  transformToDayData(
    assignmentGroups: AssignmentGroup[],
    assignments: Assignment[]
  ): DayData[] {
    // Group assignments by their task_group_id
    const groupedAssignments = assignments.reduce((acc, assignment) => {
      const groupId = assignment.task_group_id
      if (!acc[groupId]) {
        acc[groupId] = []
      }
      acc[groupId].push(assignment)
      return acc
    }, {} as Record<number, Assignment[]>)

    // Create DayData array from assignment groups
    return assignmentGroups
      .filter(group => group.is_active)
      .map(group => ({
        day: group.name,
        tasks: groupedAssignments[group.id] || []
      }))
  }
}

export const assignmentService = new AssignmentService()
