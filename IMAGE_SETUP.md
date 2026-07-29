# 📸 Image Setup Instructions

## Required Images

To make all activities work properly, you need to add the following image:

### Main Profile Image
- **Filename:** `home.png`
- **Location:** `c:\Users\Beth\OneDrive\Documents\client\jhanyn midterm exam\assets\`
- **Used in:** All activities (Activity 1-5) and main portfolio
- **Recommended size:** 400x400px (square)
- **Format:** PNG or JPG

## Where to Place Images

```
jhanyn midterm exam/
├── assets/
│   └── home.png  ← Place your profile image here
├── projects/
│   ├── activity1/
│   ├── activity2/
│   ├── activity3/
│   ├── activity4/
│   └── activity5/
└── index.html
```

## Image References in Activities

All activities currently reference: `../../assets/home.png`

This means:
- Go up 2 folders (from activity folder to root)
- Look in the `assets` folder
- Find `home.png`

## Quick Fix

If you don't have a `home.png` file yet:

1. Find a profile photo you want to use
2. Rename it to `home.png`
3. Copy it to the `assets` folder
4. Or update all activities to point to your existing image

## Alternative: Update Image Paths

If your image is in a different location or has a different name, you can:

1. Open each activity's `index.html`
2. Find the `<img src="../../assets/home.png"` line
3. Change the path to match your image location

---

**Note:** The main portfolio (`index.html`) also uses `home.png` in the root folder, so you may need a copy there as well.
