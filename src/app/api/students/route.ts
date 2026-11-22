import { NextResponse } from 'next/server';
import { StudentService } from '@/services/student.service';
import { StudentFormSchema } from '@/validations/student.schema';

export async function GET() {
  try {
    const students = await StudentService.getAllStudents();
    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = StudentFormSchema.parse(body);
    const student = await StudentService.createStudent(validated);
    return NextResponse.json({ success: true, data: student }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
