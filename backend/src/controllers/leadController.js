const prisma = require("../config/prisma");

// Create lead
async function createLead(req, res) {
  try {
    const { title } = req.body;
    console.log(title);
    const ownerId = req.user.id;

    const lead = await prisma.lead.create({
      data: { ...req.body, title },
    });

    res.status(201).json({ lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// Get leads (Admin/Manager: all, Sales Exec: own)
async function getLeads(req, res) {
  try {
    const role = req.user.role;
    const userId = req.user.id;

    const leads = await prisma.lead.findMany({
      where: role === "SALES_EXECUTIVE" ? { ownerId: userId } : {},
      include: { owner: true },
    });

    res.json({ leads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
}

// Get single lead with history
async function getLeadById(req, res) {
  try {
    const leadId = parseInt(req.params.id, 10);
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { history: { include: { changedBy: true } }, owner: true },
    });

    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json({ lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// Update lead + log history
async function updateLead(req, res) {
  try {
    const leadId = parseInt(req.params.id, 10);
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    const updates = req.body;
    const userId = req.user.id;

    const historyData = Object.keys(updates).map((field) => ({
      leadId,
      changedById: userId,
      field,
      oldValue: lead[field] ? String(lead[field]) : null,
      newValue: updates[field] ? String(updates[field]) : null,
    }));

    await prisma.$transaction([
      prisma.lead.update({ where: { id: leadId }, data: updates }),
      prisma.leadHistory.createMany({ data: historyData }),
    ]);

    const updatedLead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { history: true },
    });
    res.json({ lead: updatedLead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// Delete lead (Admin/Manager only)
async function deleteLead(req, res) {
  try {
    const leadId = parseInt(req.params.id, 10);
    await prisma.lead.delete({ where: { id: leadId } });
    res.json({ msg: "Lead deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead };
