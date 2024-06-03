frappe.ui.form.on('Customer cms', {
    before_save(frm) {
        if (!frm.doc.table2) {
            frm.doc.table2 = [];
        }
        if (!frm.doc.table1) {
            frm.doc.table1 = [];
        }
    },
    after_save(frm) {
        let len = frm.doc.table1.length; 
        let len2 = frm.doc.table2.length;
        // frappe.msgprint(`Length of Table 1: ${len}`);
        // frappe.msgprint(`Length of Table 2: ${len2}`); 
    }
});

frappe.ui.form.on('Address cms', {
    before_table1_add: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 'table1', 'table2');
    },
    before_table1_remove: function(frm, cdt, cdn) {
        var target_row_index = locals[cdt][cdn].idx;
        if (frm.doc.table2 && frm.doc.table2.length >= target_row_index && target_row_index > 0) {
            frm.get_field('table2').grid.grid_rows[target_row_index - 1].remove();
            frm.refresh_field('table2');
        } else {
            console.log("Target row not found in table2:", target_row_index);
        }
    },
    country: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 'table1', 'table2');
    },
    state: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 'table1', 'table2');
    },
    city: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 'table1', 'table2');
    }
});

frappe.ui.form.on('Addressdup cms', {
    before_table2_add: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 'table2', 'table1');
    },
    before_table2_remove: function(frm, cdt, cdn) {
        var target_row_index = locals[cdt][cdn].idx;
        if (frm.doc.table1 && frm.doc.table1.length >= target_row_index && target_row_index > 0) {
            frm.get_field('table1').grid.grid_rows[target_row_index - 1].remove();
            frm.refresh_field('table1');
        } else {
            console.log("Target row not found in table1:", target_row_index);
        }
    },
    country: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 'table2', 'table1');
    },
    state: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 'table2', 'table1');
    },
    city: function(frm, cdt, cdn) {
        sync_tables(frm, cdt, cdn, 'table2', 'table1');
    }
});

function sync_tables(frm, cdt, cdn, source_table, target_table) {
    let row = locals[cdt][cdn];
    let target_row;

    if (!frm.doc[target_table]) {
        frm.doc[target_table] = [];
    }

    target_row = frm.doc[target_table].find(d => d.idx === row.idx);

    if (!target_row) {
        target_row = frm.add_child(target_table);
        target_row.idx = row.idx; 
    }

    target_row.country = row.country;
    target_row.state = row.state;
    target_row.city = row.city;

    frm.refresh_field(target_table);
}
