import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// server-side client — safe to use service_role here since this file never runs in the browser
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, address, phone, email } = body;

  // basic validation
  if (!name || !address || !phone || !email) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // check if a customer with this phone already exists
  const { data: existing, error: checkError } = await supabase
    .from("customers")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json(
      { error: "This customer already exists" },
      { status: 409 } // 409 = Conflict, the standard status code for "duplicate"
    );
  }

  // auto-generate key from name: lowercase, no spaces
  const key = name.toLowerCase().replace(/\s+/g, "");

  const { data, error } = await supabase
    .from("customers")
    .insert([{ key, name, address, phone, email }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}