# Copyright (c) 2024, s and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.password import encrypt, decrypt


class Customercms(Document):
    def validate(self):
        try:
            self.custom_validation_method()
            self.encrypt_aadhar_card()

        except Exception as e:
            frappe.log_error(frappe.get_traceback(), str(e))
            raise

    def custom_validation_method(self):
        if not self.email:
            raise ValueError("Email is required")


    def encrypt_aadhar_card(self):
        if self.aadhar_card:
            try:
                decrypted_value = decrypt(self.aadhar_card)
            except Exception:
                encrypted_value = encrypt(self.aadhar_card)
                self.aadhar_card = encrypted_value

    @frappe.whitelist(allow_guest=True)
    def get_customer_details(email):
        customer = frappe.get_doc("Customer cms", {"email": email})
        if customer:
            return {
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "email": customer.email,
                "aadhar_card": customer.aadhar_card
            }
        else:
            frappe.throw(_("Customer not found"))

@frappe.whitelist(allow_guest=True)
def get_full_name(email):
    customer = frappe.get_doc("Customer cms", {"email": email})
    first_name = customer.first_name
    last_name =  customer.last_name
    key = f"appended_name|{first_name}+{last_name}"  # unique key representing this computation

    if cached_value := frappe.cache().get_value(key):
        return cached_value

    result = f"{first_name} {last_name}"

    frappe.cache().set_value(key, result)

    return result

