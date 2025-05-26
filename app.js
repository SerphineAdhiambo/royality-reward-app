import { supabase } from './supabase.js'

async function logVisit() {
  const phone = document.getElementById('phoneInput').value
  const output = document.getElementById('output')

  if (!phone) {
    output.textContent = "Please enter a phone number."
    return
  }

  let { data: customer, error } = await supabase
    .from('customers')
    .select('*')
    .eq('phone_number', phone)
    .single()

  if (error && error.code === 'PGRST116') {
    // New customer
    const { data, error: insertError } = await supabase
      .from('customers')
      .insert([{ phone_number: phone, visit_count: 1, last_visit: new Date() }])
    
    output.textContent = "New customer added and visit logged!"
  } else {
    // Existing customer
    const newCount = customer.visit_count + 1
    await supabase
      .from('customers')
      .update({ visit_count: newCount, last_visit: new Date() })
      .eq('phone_number', phone)
    
    if (newCount >= 5) {
      output.textContent = `🎉 Reward Unlocked! ${phone} has ${newCount} visits.`
      // Call SMS API here (mocked)
    } else {
      output.textContent = `Visit logged. Total visits: ${newCount}`
    }
  }
}
window.logVisit = logVisit
